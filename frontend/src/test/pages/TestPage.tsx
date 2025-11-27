import "../assets/styles.css";
import { useEffect, useRef, useState, type JSX } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Page2 from "./Page2";
import Page14 from "./Page14";
import Choice from "../components/Choice";
import Input from "../components/Input";
import type { ChoiceItem } from "../interfaces/ChoiceItem";
import LabelAuto from "../components/LabelAuto";
import { ICON } from "../constants/icon";
import ChoiceCheckbox from "../components/ChoiceCheckbox";
import { OBJECTIVE_ITEMS, SECTION } from "../constants/section";
import { CHOICE_ITEMS } from "../constants/choiceItem";
import { TestUtils } from "../utils/TestUtils";
import TestResult from "../components/TestResult";
import Header from "../components/Header";
import useLocalStorage from "../hooks/useLocalStorage";
import type { ITestStorage } from "../interfaces/ITestStorage";
import Recommendation from "./Recommendation";
import type { Product } from "../interfaces/Product";
import axiosInstance from "../../utils/axios";
import { ProductService } from "../../drugs/services/ProductService";
import Popup from "../components/Popup";
import { useLoading } from "../../common/hooks/useLoading";
import WhyAskDialog from "../components/WhyAskDialog";

const TestPage = () => {
  const defaultTestData: ITestStorage = {
    name: "",
    email: "",
    selectedCategories: [],
    selectedProducts: [],
  };
  const [_, setTestData] = useLocalStorage<ITestStorage>(
    "testData",
    defaultTestData
  );
  const [hasError, setHasError] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [supplementText, setSupplementText] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedObjectives, setSelectedObjectives] = useState<number[]>([]);
  const [saveObjectives, setSaveObjectives] = useState<number[]>([]);
  const [selectedMockItem, setSelectedMockItem] = useState<number[]>([]);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [whyAskText, setWhyAskText] = useState<string>("");
  const [popupProduct, setPopupProduct] = useState<Product>();
  const { setLoading } = useLoading();

  const location = useLocation();
  const navigate = useNavigate();
  const nodeRef = useRef(null);
  const testUtils = new TestUtils();
  const productService = new ProductService();

  useEffect(() => {
    if (
      !name &&
      location.pathname.startsWith("/test/page") &&
      location.pathname !== "/test/page1"
    ) {
      navigate("/test/page1");
    }
  }, []);

  const handleNext = (response?: number) => {
    const pathName = location.pathname;
    const match = pathName.match(/(\d+)/);
    if (!match) return;
    const page = Number(match[0]);
    setSelectedMockItem([]); //nuh uh deo co data ma xu ly
    const nextPage = testUtils.getNextPage(page, selectedObjectives, response);
    navigate(`/test/page${nextPage}`);
  };

  const finishTest = () => {
    handleAddCartProducts(saveObjectives).then((products) => {
      setTestData({
        name: name,
        email: email,
        selectedCategories: saveObjectives.map(
          (objective) =>
            OBJECTIVE_ITEMS.find((obj) => obj.id == objective)?.text ?? ""
        ),
        selectedProducts: getRandomProducts(products),
      });

      window.location.href = "/test/result";
    });
  };

  const getRandomProducts = (productList: Product[]): Product[] => {
    const shuffledArray = [...productList];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray.slice(0, 5);
  };

  const objectiveMapping = [
    {
      objective: 2,
      feature: 17,
      text: SECTION.ENERGY,
    },
    {
      objective: 3,
      feature: 4,
      text: SECTION.HEART,
    },
    {
      objective: 4,
      feature: 16,
      text: SECTION.IMMUNITY,
    },
    {
      objective: 5,
      feature: 2,
      text: SECTION.SKIN,
    },
    {
      objective: 6,
      feature: 3,
      text: SECTION.HAIR,
    },
    {
      objective: 7,
      feature: 6,
      text: SECTION.DIGESTION,
    },
    {
      objective: 8,
      feature: 15,
      text: SECTION.STRESS,
    },
    {
      objective: 9,
      feature: 11,
      text: SECTION.BONES,
    },
    {
      objective: 10,
      feature: 12,
      text: SECTION.SLEEP,
    },
    {
      objective: 12,
      feature: 9,
      text: SECTION.WOMEN_HEALTH,
    },
    {
      objective: 13,
      feature: 10,
      text: SECTION.MEN_HEALTH,
    },
    {
      objective: 14,
      feature: 14,
      text: SECTION.SPORT,
    },
    {
      objective: 15,
      feature: 5,
      text: SECTION.CONCEPTION_MATERNITY,
    },
    {
      objective: 16,
      feature: 17,
      text: SECTION.LONGEVITY,
    },
  ];

  const handleAddCartProducts = async (objectiveIds: number[]) => {
    setLoading(true);
    let features = objectiveIds.map((objective) => {
      const objectivePair = objectiveMapping.find(
        (obj) => obj.objective === objective
      );
      if (objectivePair) {
        return objectivePair.feature;
      } else {
        return 0;
      }
    });

    features = features.filter((feature) => feature !== 0);

    let products: Product[] = [];

    await axiosInstance
      .get("/products/filter?featureIds=" + features.join(","))
      .then((res) => {
        const productFeatures = res.data.products.map((product: any) => {
          for (let i = 0; i < product.features.length; i++) {
            if (features.includes(product.features[i].id)) {
              return product.features[i].title;
            }
          }
        });

        products = res.data.products.map((product: any, index: number) => {
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            subscription: false,
            feature: productFeatures[index],
            amount: product.amount,
            activeIngredients: product.activeIngredients,
            additiveIngredients: product.additiveIngredients,
            usage: product.usage,
            contraindication: product.contraindication,
          };
        });
      });

    for (let i = 0; i < products.length; i++) {
      const image = await productService.getProductImages(products[i].id);
      products[i].image = image[0];
    }

    setLoading(false);
    return products;
  };

  const handleNameInput = () => {
    if (!name) {
      setHasError(true);
    } else {
      setHasError(false);
      handleNext();
    }
  };

  const getCurrentProgress = () => {
    const pathName = location.pathname;
    if (pathName === "/test/result" || pathName === "/test/recommendation") {
      return 100;
    }
    const match = pathName.match(/(\d+)/);
    if (!match) {
      return 0;
    }
    const page = Number(match[0]);
    const totalPages = testElements.length;

    return ((page - 1) / (totalPages - 1)) * 100;
  };

  useEffect(() => {
    setCurrentProgress(getCurrentProgress());
  }, [handleNext]);

  const handleSelectSupplements = (item: number) => {
    switch (item) {
      case 1:
        setSupplementText(
          "Bạn là chuyên gia? Chúng tôi vẫn sẽ cố gắng mang đến cho bạn thêm điều gì đó mới!"
        );
        break;
      case 2:
        setSupplementText(
          "Tuyệt, chúng tôi sẽ cố gắng giải đáp sự tò mò của bạn!"
        );
        break;
      case 3:
        setSupplementText(
          "Tuyệt, chúng tôi đã thiết kế trải nghiệm Nouri để thuyết phục cả những người còn phân vân."
        );
        break;
      default:
        setSupplementText("");
    }
    handleNext();
  };

  const handleAgeInput = () => {
    if (!age || !Number(age)) {
      setHasError(true);
    } else if (Number(age) < 12 || Number(age) > 99) {
      setHasError(true);
    } else {
      setHasError(false);
      handleNext();
    }
  };

  const handleEmailInput = () => {
    if (
      !email ||
      !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      setHasError(true);
    } else {
      setHasError(false);
      handleNext();
    }
  };

  const handleToggleObjective = (id: number) => {
    if (selectedObjectives.find((objId) => objId === id)) {
      setSelectedObjectives(selectedObjectives.filter((objId) => objId !== id));
    } else {
      setSelectedObjectives([...selectedObjectives, id]);
    }
  };

  const handleCheckObjectives = () => {
    if (selectedObjectives.length === 0) {
      setHasError(true);
    } else {
      setHasError(false);
      setSelectedObjectives(selectedObjectives.sort((a, b) => a - b));
      setSaveObjectives([...selectedObjectives.sort((a, b) => a - b)]);
      handleNext();
    }
  };

  const handleToggleWhyAskModal = (text: string) => {
    setWhyAskText(text);
  };

  const getChoiceItems = (index: number): ChoiceItem[] => CHOICE_ITEMS[index];

  const testElements: JSX.Element[] = [
    <Input
      title={SECTION.GENERAL}
      description="Trước tiên, tên của bạn là gì?"
      value={name}
      setValue={setName}
      hasError={hasError}
      errorMsg="Vui lòng nhập tên!"
      handleInput={handleNameInput}
      whyAskText="Điều này giúp chúng tôi cá nhân hóa tên của bạn trên các gói vitamin hằng ngày."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Page2 title={SECTION.GENERAL} name={name} onNext={handleNext} />,
    <Choice
      title={SECTION.GENERAL}
      header="Khi nói đến thực phẩm bổ sung, bạn là người:"
      items={getChoiceItems(0)}
      onSelect={handleSelectSupplements}
      whyAskText="Điều này giúp chúng tôi điều chỉnh cách giải thích và đề xuất sao cho phù hợp với mức độ hiểu biết của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <LabelAuto
      title={supplementText}
      description="Đừng lo, bạn sẽ chỉ mất chưa đến 5 phút."
      onNext={handleNext}
    />,
    <Choice
      title={SECTION.GENERAL}
      header="Hiện tại bạn có đang dùng thực phẩm bổ sung nào không?"
      items={getChoiceItems(1)}
      onSelect={(response) => handleNext(response)}
    />,
    <Choice
      title={SECTION.GENERAL}
      header="Bạn thường dùng bao nhiêu loại thực phẩm bổ sung?"
      items={getChoiceItems(2)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.GENERAL}
      header="Trong một tuần, bạn dùng thực phẩm bổ sung bao nhiêu lần?"
      items={getChoiceItems(3)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.GENERAL}
      header="Trước đây bạn đã từng dùng thực phẩm bổ sung chưa?"
      items={getChoiceItems(4)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.GENERAL}
      header="Giới tính sinh học của bạn là gì?"
      items={getChoiceItems(5)}
      onSelect={handleNext}
    />,
    <Input
      title={SECTION.GENERAL}
      description="Bạn bao nhiêu tuổi?"
      value={age}
      setValue={setAge}
      isNumber
      hasError={hasError}
      errorMsg="Vui lòng nhập tuổi từ 12 đến 99!"
      handleInput={handleAgeInput}
      whyAskText="Nhu cầu dinh dưỡng thay đổi theo tuổi. Biết bạn thuộc nhóm tuổi nào giúp chúng tôi đưa ra các đề xuất phù hợp với nhu cầu ở từng giai đoạn cuộc sống."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Input
      title={SECTION.GENERAL}
      description="Email của bạn là gì?"
      value={email}
      setValue={setEmail}
      hasError={hasError}
      errorMsg="Vui lòng nhập đúng định dạng email!"
      handleInput={handleEmailInput}
    />,
    <LabelAuto
      title="Tốt rồi, bây giờ chúng ta đến phần mục tiêu của bạn nhé!"
      onNext={handleNext}
    />,
    <Choice
      title={SECTION.GOALS}
      header="Hiện tại bạn đang mong muốn điều gì?"
      items={getChoiceItems(6)}
      onSelect={handleNext}
      whyAskText="Câu hỏi này giúp chúng tôi hiểu rõ lý do chính và mong đợi của bạn, để có thể điều chỉnh phần đề xuất sao cho phù hợp nhất với mục tiêu cá nhân của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Page14
      title={SECTION.GOALS}
      header="Bạn đang muốn cải thiện vấn đề nào?"
      description="Hãy chọn những mục bạn ưu tiên lúc này, chúng tôi sẽ dựa vào đó để đưa ra đề xuất phù hợp nhất."
      objectiveIds={selectedObjectives}
      onToggle={handleToggleObjective}
      errorMsg="Vui lòng chọn ít nhất một mục!"
      hasError={hasError}
      handleCheck={handleCheckObjectives}
    />,
    <Choice
      title={SECTION.BRAIN}
      image={ICON.BRAIN}
      header="Thỉnh thoảng bạn có thấy khó tập trung không?"
      items={getChoiceItems(7)}
      onSelect={handleNext}
      whyAskText="Khó tập trung đôi khi cho thấy cơ thể đang cần nhiều hơn một số dưỡng chất quan trọng cho hoạt động của não bộ. Thông tin này giúp chúng tôi đưa ra đề xuất phù hợp hơn để hỗ trợ sự minh mẫn và sức khỏe tinh thần của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.BRAIN}
      image={ICON.BRAIN}
      header="Bạn có quan tâm đặc biệt đến trí nhớ ngắn hạn của mình không?"
      items={getChoiceItems(8)}
      onSelect={handleNext}
      whyAskText="Vấn đề về trí nhớ có thể bị ảnh hưởng bởi nhiều yếu tố, trong đó có chế độ ăn uống và lối sống. Thông tin này giúp chúng tôi hiểu rõ hơn ưu tiên của bạn và điều chỉnh phần đề xuất cho phù hợp."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.ENERGY}
      image={ICON.ENERGY}
      header="Tình trạng mệt mỏi của bạn như thế nào?"
      items={getChoiceItems(9)}
      onSelect={handleNext}
      whyAskText="Tình trạng mệt mỏi có thể cho thấy cơ thể đang cần thêm một số chất dinh dưỡng giúp duy trì năng lượng và sức sống.
 Hiểu rõ mức độ mệt của bạn giúp chúng tôi đưa ra gợi ý thực phẩm bổ sung phù hợp để hỗ trợ sức khỏe."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.ENERGY}
      image={ICON.ENERGY}
      header="Bạn thường thấy mệt vào thời điểm nào trong ngày?"
      items={getChoiceItems(10)}
      onSelect={handleNext}
      whyAskText="Biết bạn thường mệt vào thời điểm nào trong ngày giúp chúng tôi hiểu nguyên nhân có thể và điều chỉnh đề xuất thực phẩm bổ sung để hỗ trợ năng lượng của bạn đúng lúc."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <ChoiceCheckbox
      title={SECTION.HEART}
      image={ICON.HEART}
      header="Bạn đang quan tâm vấn đề nào liên quan đến tim mạch?"
      items={getChoiceItems(11)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
      whyAskText="Một số vấn đề về tim mạch có thể liên quan đến nhu cầu dinh dưỡng khác nhau. Biết bạn đang quan tâm điều gì giúp chúng tôi đưa ra đề xuất thực phẩm bổ sung phù hợp để hỗ trợ sức khỏe tim mạch của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.HEART}
      image={ICON.HEART}
      header="Bạn có hay cảm thấy nặng chân không?"
      items={getChoiceItems(12)}
      onSelect={handleNext}
      whyAskText="Cảm giác nặng chân đôi khi liên quan đến việc máu lưu thông chưa tốt hoặc cơ thể thiếu một số vi chất. Biết điều này giúp chúng tôi điều chỉnh đề xuất thực phẩm bổ sung phù hợp hơn với bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.IMMUNITY}
      image={ICON.IMMUNITY}
      header="Bạn có muốn tăng cường hệ miễn dịch của mình không?"
      items={getChoiceItems(13)}
      onSelect={handleNext}
      whyAskText="Hệ miễn dịch đóng vai trò quan trọng trong việc bảo vệ cơ thể trước các tác nhân gây bệnh. Biết bạn có muốn tăng cường hệ miễn dịch hay không giúp chúng tôi điều chỉnh đề xuất thực phẩm bổ sung phù hợp với mục tiêu chăm sóc sức khỏe của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <ChoiceCheckbox
      title={SECTION.SKIN}
      image={ICON.SKIN}
      header="Vấn đề về làn da bạn đang quan tâm điều gì nhất?"
      items={getChoiceItems(14)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
      whyAskText="Nhu cầu dinh dưỡng cho da thay đổi theo tình trạng và vấn đề bạn đang gặp. Biết điều bạn quan tâm giúp chúng tôi đề xuất thực phẩm bổ sung phù hợp để hỗ trợ làn da khỏe và cải thiện vẻ ngoài của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <ChoiceCheckbox
      title={SECTION.HAIR}
      image={ICON.HAIR}
      header="Vấn đề về tóc bạn đang quan tâm điều gì nhất?"
      items={getChoiceItems(15)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
      whyAskText="Tình trạng tóc có thể cho thấy cơ thể bạn đang thiếu một số dưỡng chất cần thiết để tóc mọc chắc và khỏe hơn. Biết bạn đang quan tâm điều gì giúp chúng tôi đưa ra đề xuất thực phẩm bổ sung phù hợp cho tóc của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <ChoiceCheckbox
      title={SECTION.DIGESTION}
      image={ICON.DIGESTION}
      header="Bạn muốn tập trung cải thiện phần nào của hệ tiêu hoá?"
      items={getChoiceItems(16)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
      whyAskText="Mỗi phần của hệ tiêu hoá có thể gặp những vấn đề khác nhau. Biết bạn đang khó chịu ở đâu giúp chúng tôi đưa ra đề xuất thực phẩm bổ sung phù hợp nhất cho vùng tiêu hoá bạn cần hỗ trợ."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.DIGESTION}
      image={ICON.DIGESTION}
      header="Bạn đi ngoài:"
      items={getChoiceItems(17)}
      onSelect={handleNext}
      whyAskText="Tần suất đi ngoài cho thấy đường ruột của bạn hoạt động ra sao. Một số thực phẩm bổ sung như chất xơ hoặc men vi sinh có thể hỗ trợ khi bạn đi ngoài không đều"
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.STRESS}
      image={ICON.STRESS}
      header="Căng thẳng của bạn được biểu hiện:"
      items={getChoiceItems(18)}
      onSelect={handleNext}
      whyAskText="Căng thẳng có thể ảnh hưởng đến sức khỏe tổng thể và làm thay đổi nhu cầu về một số chất dinh dưỡng thiết yếu. Hiểu bạn căng thẳng như thế nào giúp chúng tôi đưa ra đề xuất thực phẩm bổ sung phù hợp để hỗ trợ cân bằng cả thể chất lẫn tinh thần."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.STRESS}
      image={ICON.STRESS}
      header="Bạn cảm thấy căng thẳng khi nào?"
      items={getChoiceItems(19)}
      onSelect={handleNext}
      whyAskText="Những lúc bạn căng thẳng, cơ thể có thể cần nhiều dưỡng chất hơn để kiểm soát mệt mỏi và cảm xúc. Hiểu mức độ căng thẳng của bạn giúp chúng tôi tìm ra những giải pháp phù hợp nhất với tình trạng của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <ChoiceCheckbox
      title={SECTION.BONES}
      image={ICON.BONE}
      header="Bạn có quan tâm đặc biệt đến xương hay khớp của mình không?"
      items={getChoiceItems(20)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
      whyAskText="Một số người có nhu cầu riêng về xương hoặc khớp. Biết bạn đang quan tâm điều gì giúp chúng tôi đề xuất thực phẩm bổ sung phù hợp để hỗ trợ khớp linh hoạt và xương chắc khỏe hơn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.SLEEP}
      image={ICON.MOON}
      header="Bạn có bị khó ngủ vào ban đêm không?"
      items={getChoiceItems(21)}
      onSelect={handleNext}
      whyAskText="Các vấn đề về giấc ngủ có thể liên quan đến việc cơ thể mất cân bằng một số dưỡng chất tham gia vào quá trình thư giãn và điều hòa chu kỳ thức - ngủ."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.SLEEP}
      image={ICON.MOON}
      header="Bạn có cảm thấy mệt mỏi khi thức dậy không?"
      items={getChoiceItems(22)}
      onSelect={handleNext}
      whyAskText="Cảm giác mệt mỏi kéo dài khi thức dậy có thể là dấu hiệu của việc thiếu một số chất dinh dưỡng thiết yếu, không ngủ đủ hoặc lối sống mất cân bằng. Biết được điều này giúp chúng tôi hiểu rõ hơn nhu cầu của bạn để đề xuất giải pháp phù hợp"
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.SHAPE}
      image={ICON.APPLE}
      header="Mục tiêu của bạn về cân nặng là gì?"
      items={getChoiceItems(23)}
      onSelect={handleNext}
      whyAskText="Mục tiêu về cân nặng của bạn sẽ ảnh hưởng đến nhu cầu dinh dưỡng và loại thực phẩm bổ sung chúng tôi đề xuất để đồng hành với bạn tốt hơn và hỗ trợ đạt được kết quả mong muốn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <ChoiceCheckbox
      title={SECTION.SHAPE}
      image={ICON.APPLE}
      header="Bạn thường gặp tình trạng…"
      items={getChoiceItems(24)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
      whyAskText="Thói quen ăn uống và những khó chịu trong cơ thể có thể cho thấy một số mất cân bằng hoặc nhu cầu riêng của cơ thể. Hiểu những điều này giúp chúng tôi điều chỉnh đề xuất thực phẩm bổ sung phù hợp hơn để hỗ trợ sức khỏe tổng thể của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <ChoiceCheckbox
      title={SECTION.SHAPE}
      image={ICON.APPLE}
      header="Bạn thường gặp tình trạng…"
      items={getChoiceItems(25)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
      whyAskText="Thói quen ăn uống và những khó chịu trong cơ thể có thể cho thấy một số mất cân bằng hoặc nhu cầu riêng của cơ thể. Hiểu những điều này giúp chúng tôi điều chỉnh đề xuất thực phẩm bổ sung phù hợp hơn để hỗ trợ sức khỏe tổng thể của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.WOMEN_HEALTH}
      image={ICON.WOMEN}
      header="Gần đây tình trạng đi tiểu của bạn thế nào?"
      items={getChoiceItems(26)}
      onSelect={handleNext}
      whyAskText="Một số loại thảo dược và chất dinh dưỡng có thể hỗ trợ đường tiết niệu hoạt động tốt hơn. Câu hỏi này giúp chúng tôi xác định có cần hỗ trợ đặc biệt nào phù hợp cho bạn hay không."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.WOMEN_HEALTH}
      image={ICON.WOMEN}
      header="Chu kỳ kinh nguyệt của bạn như thế nào?"
      items={getChoiceItems(27)}
      onSelect={handleNext}
      whyAskText="Tần suất kinh nguyệt có thể ảnh hưởng đến nhu cầu của cơ thể với một số dưỡng chất. Hiểu chu kỳ của bạn giúp chúng tôi điều chỉnh đề xuất thực phẩm bổ sung sao cho phù hợp nhất với tình trạng của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.WOMEN_HEALTH}
      image={ICON.WOMEN}
      header="Bạn có bị hội chứng tiền kinh nguyệt không?"
      description="Hội chứng tiền kinh nguyệt là một loạt các triệu chứng về thể chất và tinh thần xuất hiện từ vài giờ đến vài ngày trước kỳ kinh (đau bụng, căng ngực, lo âu, dễ cáu gắt)."
      items={getChoiceItems(28)}
      onSelect={handleNext}
      whyAskText="Hội chứng tiền kinh nguyệt là những triệu chứng xảy ra trong vài ngày trước kỳ kinh và giảm dần khi bắt đầu có kinh. Một số dưỡng chất hoặc thảo dược có thể giúp làm dịu các triệu chứng này. Câu trả lời của bạn giúp chúng tôi xác định liệu bạn có cần hỗ trợ thêm hay không."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <ChoiceCheckbox
      title={SECTION.WOMEN_HEALTH}
      image={ICON.WOMEN}
      header="Bạn có cần hỗ trợ gì về sức khỏe sinh lý không?"
      items={getChoiceItems(29)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
      whyAskText="Một số vấn đề như giảm ham muốn hay khó thụ thai có thể được cải thiện nhờ bổ sung dinh dưỡng phù hợp. Biết nhu cầu của bạn giúp chúng tôi đưa ra những đề xuất thực sự cần thiết cho bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <ChoiceCheckbox
      title={SECTION.MEN_HEALTH}
      image={ICON.MEN}
      header="Bạn có cần hỗ trợ gì về sức khỏe sinh lý không?"
      items={getChoiceItems(30)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
      whyAskText="Hiểu rõ nhu cầu sinh lý của bạn giúp chúng tôi đưa ra những đề xuất phù hợp để hỗ trợ ham muốn, khả năng sinh sản hoặc chức năng cương dương tùy theo điều bạn đang quan tâm."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.SPORT}
      image={ICON.SPORT}
      header="Một tuần bạn tập thể dục/chơi thể thao bao nhiêu lần?"
      items={getChoiceItems(31)}
      onSelect={handleNext}
      whyAskText="Mức độ vận động ảnh hưởng đến nhu cầu các chất dinh dưỡng quan trọng như đạm, vitamin và khoáng chất. Biết bạn tập luyện nhiều hay ít giúp chúng tôi điều chỉnh đề xuất thực phẩm bổ sung phù hợp với cơ thể bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.SPORT}
      image={ICON.SPORT}
      header="Bạn có đang chuẩn bị cho một cuộc thi đấu thể thao không?"
      items={getChoiceItems(32)}
      onSelect={handleNext}
      whyAskText="Khi bạn tập luyện để chuẩn bị thi đấu, cơ thể thường cần nhiều chất dinh dưỡng hơn, đặc biệt là các vi chất. Biết điều này giúp chúng tôi điều chỉnh đề xuất thực phẩm bổ sung để hỗ trợ hiệu suất và khả năng hồi phục của bạn tốt hơn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <ChoiceCheckbox
      title={SECTION.SPORT}
      image={ICON.SPORT}
      header="Bạn thường tập loại hình thể thao nào?"
      items={getChoiceItems(33)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
      whyAskText="Việc bạn tập thể thao ảnh hưởng đến nhu cầu dinh dưỡng, đặc biệt là chất đạm, vitamin và khoáng chất. Biết bạn tập môn gì giúp chúng tôi điều chỉnh đề xuất thực phẩm bổ sung phù hợp hơn với bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <ChoiceCheckbox
      title={SECTION.SPORT}
      image={ICON.SPORT}
      header="Bạn muốn cải thiện điều gì trong quá trình tập luyện?"
      items={getChoiceItems(34)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <Choice
      title={SECTION.CONCEPTION_MATERNITY}
      image={ICON.PREGNANT}
      header="Hiện tại bạn đang trong giai đoạn nào?"
      items={getChoiceItems(35)}
      onSelect={handleNext}
    />,
    <LabelAuto
      title="Bây giờ chúng ta chuyển sang phần lối sống của bạn!"
      onNext={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn nghĩ hiện tại mình có lối sống lành mạnh không?"
      items={getChoiceItems(36)}
      onSelect={handleNext}
      whyAskText="Lối sống của bạn ảnh hưởng trực tiếp đến nhu cầu về các chất dinh dưỡng. Biết bạn đánh giá lối sống của mình như thế nào giúp chúng tôi đưa ra những đề xuất phù hợp với tình trạng của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Trong một tuần, bạn ăn cá hoặc hải sản bao nhiêu lần?"
      items={getChoiceItems(37)}
      onSelect={handleNext}
      whyAskText="Hải sản là nguồn cung cấp nhiều dưỡng chất quan trọng mà các thực phẩm khác thường ít có. Biết bạn ăn hải sản bao nhiêu lần giúp chúng tôi nhận diện những nhu cầu dinh dưỡng còn thiếu để bổ sung cho phù hợp."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn ăn thịt hoặc trứng bao nhiêu lần một tuần?"
      items={getChoiceItems(38)}
      onSelect={handleNext}
      whyAskText="Thịt và trứng là nguồn cung cấp nhiều protein và các chất dinh dưỡng thiết yếu. Biết bạn dùng chúng bao nhiêu giúp chúng tôi điều chỉnh phần đề xuất, để bù lại những thiếu hụt có thể xảy ra nếu khẩu phần chưa đủ."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Mỗi ngày bạn ăn rau và trái cây bao nhiêu lần?"
      items={getChoiceItems(39)}
      onSelect={handleNext}
      whyAskText="Rau và trái cây là nguồn cung cấp nhiều vitamin, khoáng chất và chất chống oxy hóa quan trọng cho cơ thể. Nếu ăn không đủ có thể gây mất cân bằng dinh dưỡng, nên chúng tôi cần biết để đánh giá đúng nhu cầu của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Mỗi ngày bạn dùng các sản phẩm từ sữa bao nhiêu lần?"
      items={getChoiceItems(40)}
      onSelect={handleNext}
      whyAskText="Các sản phẩm từ sữa cung cấp nhiều dưỡng chất quan trọng cho xương và cho nhiều chức năng khác của cơ thể. Biết lượng bạn dùng mỗi ngày giúp chúng tôi đánh giá xem khẩu phần ăn hiện tại có đáp ứng đủ nhu cầu dinh dưỡng hay không."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn có thường xuyên uống quá 3 ly đồ uống có cồn trong một ngày không?"
      items={getChoiceItems(41)}
      onSelect={handleNext}
      whyAskText="Việc uống rượu, bia thường xuyên có thể làm giảm khả năng hấp thu một số dưỡng chất quan trọng và làm tăng nhu cầu dinh dưỡng của cơ thể. Thông tin này giúp chúng tôi điều chỉnh phần đề xuất cho phù hợp với lối sống của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn có thường xuyên uống hơn 10 ly đồ uống có cồn trong một tuần không?"
      items={getChoiceItems(42)}
      onSelect={handleNext}
      whyAskText="Việc uống rượu, bia thường xuyên có thể làm giảm khả năng hấp thu một số dưỡng chất quan trọng và làm tăng nhu cầu dinh dưỡng của cơ thể. Thông tin này giúp chúng tôi điều chỉnh phần đề xuất cho phù hợp với lối sống của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Hàng ngày bạn có hút thuốc không?"
      items={getChoiceItems(43)}
      onSelect={handleNext}
      whyAskText="Thuốc lá có thể làm tăng nhu cầu của cơ thể với một số dưỡng chất, và một số loại lại không được khuyến khích dùng kèm. Biết thói quen của bạn giúp chúng tôi điều chỉnh khuyến nghị cho phù hợp với nhu cầu riêng của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Trong tháng tới, bạn có định ở ngoài nắng nhiều không?"
      items={getChoiceItems(44)}
      onSelect={handleNext}
      whyAskText="Trước khi ra nắng nhiều, cơ thể có thể được hỗ trợ tốt hơn bằng một số loại thực phẩm bổ sung. Thông tin này giúp chúng tôi điều chỉnh đề xuất cho phù hợp với nhu cầu của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Mỗi ngày bạn có nhìn màn hình máy tính hơn 3 tiếng không?"
      items={getChoiceItems(45)}
      onSelect={handleNext}
      whyAskText="Nhìn màn hình quá lâu có thể gây mỏi mắt và làm tăng nhu cầu một số dưỡng chất hỗ trợ cho mắt dễ chịu hơn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn cảm thấy mắt mình dạo này như thế nào?"
      items={getChoiceItems(46)}
      onSelect={handleNext}
      whyAskText="Một số dưỡng chất có thể giúp mắt dễ chịu và khỏe hơn. Câu trả lời của bạn giúp chúng tôi xác định xem bạn có nhu cầu hỗ trợ đặc biệt nào để giữ gìn hoặc cải thiện thị lực hay không."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bác sĩ có từng khuyên bạn bổ sung sắt không?"
      items={getChoiceItems(47)}
      onSelect={handleNext}
      whyAskText="Một số người có nhu cầu sắt cao hơn bình thường. Chúng tôi cần biết bác sĩ đã từng khuyên bạn bổ sung sắt hay chưa để tránh nguy cơ dùng quá liều hoặc tiếp tục đề xuất thêm sản phẩm sắt không cần thiết."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <ChoiceCheckbox
      title={SECTION.LIFESTYLE}
      header="Bạn có bị dị ứng với những loại thực phẩm nào dưới đây không?"
      items={getChoiceItems(48)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
      whyAskText="Để chúng tôi không đề xuất những sản phẩm có chứa thành phần mà bạn bị dị ứng hoặc không hợp, từ đó đảm bảo an toàn và sức khỏe cho bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn có đang theo chế độ ăn uống đặc biệt nào không?"
      items={getChoiceItems(49)}
      onSelect={handleNext}
    />,
    <ChoiceCheckbox
      title={SECTION.LIFESTYLE}
      header="Câu hỏi cuối cùng! Bạn biết chúng tôi qua đâu?"
      items={getChoiceItems(50)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <ChoiceCheckbox
      title={SECTION.LIFESTYLE}
      header="Bạn có đang thuộc một trong các trường hợp sau không?"
      description="Chúng tôi chỉ liệt kê những tình trạng sức khỏe có thể cần thận trọng khi dùng thực phẩm bổ sung. Nếu bạn gặp trường hợp nào, chúng tôi sẽ điều chỉnh phần đề xuất cho phù hợp."
      items={getChoiceItems(51)}
      onSelect={finishTest}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
      whyAskText="Một số bệnh lý hoặc thuốc bạn đang dùng có thể chống chỉ định hoặc cần điều chỉnh khi sử dụng thực phẩm bổ sung. Câu hỏi này giúp chúng tôi đưa ra khuyến nghị phù hợp và an toàn cho sức khỏe của bạn."
      handleShowWhyAskDialog={handleToggleWhyAskModal}
    />,
  ];

  return (
    <div className="min-h-screen flex justify-center items-center w-full overflow-hidden relative bg-[url('/assets/NOURI_SURVEY.png')] bg-bottom md:bg-[length:100%_auto] bg-no-repeat">
      <Popup
        isOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        product={popupProduct}
      />
      <WhyAskDialog
        isOpen={whyAskText !== ""}
        setIsOpen={() => setWhyAskText("")}
        text={whyAskText}
      />
      <Header currentProgress={currentProgress} />
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={1500}
          unmountOnExit
          nodeRef={nodeRef}
        >
          <div ref={nodeRef} className="mt-[70px] select-none">
            <Routes location={location}>
              {testElements.map((element, index) => (
                <Route
                  key={index}
                  path={`page${index + 1}`}
                  element={element}
                />
              ))}
            </Routes>
          </div>
        </CSSTransition>
      </SwitchTransition>
      <Routes>
        <Route path="result" element={<TestResult />} />
        <Route
          path="recommendation"
          element={
            <Recommendation
              setIsPopupOpen={setIsPopupOpen}
              setProduct={setPopupProduct}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default TestPage;
