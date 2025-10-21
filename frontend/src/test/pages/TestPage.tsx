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

const TestPage = () => {
  const defaultTestData: ITestStorage = {
    name: '',
    email: '',
    selectedCategories: [],
    selectedProducts: []
  }
  const [_, setTestData] = useLocalStorage<ITestStorage>('testData', defaultTestData);
  const [hasError, setHasError] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [supplementText, setSupplementText] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedObjectives, setSelectedObjectives] = useState<number[]>([]);
  const [saveObjectives, setSaveObjectives] = useState<number[]>([]);
  const [selectedMockItem, setSelectedMockItem] = useState<number[]>([]);
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();
  const nodeRef = useRef(null);
  const testUtils = new TestUtils();
  const productService = new ProductService();

  const handleNext = (response?: number) => {
    console.log("next");
    const pathName = location.pathname;
    const match = pathName.match(/(\d+)/);
    if (!match) return;
    const page = Number(match[0]);
    setSelectedMockItem([]); //nuh uh deo co data ma xu ly
    const nextPage = testUtils.getNextPage(page, selectedObjectives, response);
    navigate(`/test/page${nextPage}`);
  };

  const finishTest = () => {
    handleAddCartProducts(saveObjectives)
      .then(products => {
        setTestData({
          name: name,
          email: email,
          selectedCategories: saveObjectives.map(objective => OBJECTIVE_ITEMS.find(obj => obj.id == objective)?.text ?? ""),
          selectedProducts: products.slice(0, 4)
        })

        window.location.href = "/test/result";
      })
  };

  const objectiveMapping = [
    {
      objective: 2,
      feature: 17,
      text: SECTION.ENERGY
    },
    {
      objective: 3,
      feature: 4,
      text: SECTION.HEART
    },
    {
      objective: 4,
      feature: 16,
      text: SECTION.IMMUNITY
    },
    {
      objective: 5,
      feature: 2,
      text: SECTION.SKIN
    },
    {
      objective: 6,
      feature: 3,
      text: SECTION.HAIR
    },
    {
      objective: 7,
      feature: 6,
      text: SECTION.DIGESTION
    },
    {
      objective: 8,
      feature: 15,
      text: SECTION.STRESS
    },
    {
      objective: 9,
      feature: 11,
      text: SECTION.BONES
    },
    {
      objective: 10,
      feature: 12,
      text: SECTION.SLEEP
    },
    {
      objective: 12,
      feature: 9,
      text: SECTION.WOMEN_HEALTH
    },
    {
      objective: 13,
      feature: 10,
      text: SECTION.MEN_HEALTH
    },
    {
      objective: 14,
      feature: 14,
      text: SECTION.SPORT
    },
    {
      objective: 15,
      feature: 5,
      text: SECTION.CONCEPTION_MATERNITY
    },
    {
      objective: 16,
      feature: 17,
      text: SECTION.LONGEVITY
    }
  ]



  const handleAddCartProducts = async (objectiveIds: number[]) => {
    let features = objectiveIds.map(objective => {
      const objectivePair = objectiveMapping.find(obj => obj.objective === objective);
      if (objectivePair) {
        return objectivePair.feature;
      } else {
        return 0;
      }
    });

    features = features.filter(feature => feature !== 0);

    let products: Product[] = [];

    await axiosInstance.get("/products/filter?featureIds=" + features.join(","))
      .then(res => {
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
            feature: productFeatures[index]
          }
        })
      })

    for (let i = 0; i < products.length; i++) {
      const image = await productService.getProductImages(products[i].id);
      products[i].image = image[0];
    }

    return products;
  }

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
    if ((pathName === "/test/result") || (pathName === '/test/recommendation')) {
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
          "Bạn là chuyên gia? Chúng tôi sẽ cố gắng dạy bạn điều gì đó mới mẻ!"
        );
        break;
      case 2:
        setSupplementText(
          "Hoàn hảo! Chúng tôi sẽ cố gắng thỏa mãn sự tò mò của bạn!"
        );
        break;
      case 3:
        setSupplementText(
          "Hoàn hảo! Chúng tôi thiết kế Nouri để thuyết phục những người hoài nghi!"
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
      setSelectedObjectives(selectedObjectives.sort());
      setSaveObjectives([...selectedObjectives.sort()]);
      handleNext();
    }
  };

  const getChoiceItems = (index: number): ChoiceItem[] => CHOICE_ITEMS[index];

  const testElements: JSX.Element[] = [
    <Input
      title={SECTION.GENERAL}
      description="Bạn tên là gì?"
      value={name}
      setValue={setName}
      hasError={hasError}
      errorMsg="Vui lòng nhập tên!"
      handleInput={handleNameInput}
    />,
    <Page2
      title={SECTION.GENERAL}
      name={name}
      onNext={handleNext}
    />,
    <Choice
      title={SECTION.GENERAL}
      header="Khi nói đến thực phẩm bổ sung, bạn:"
      items={getChoiceItems(0)}
      onSelect={handleSelectSupplements}
    />,
    <LabelAuto
      title={supplementText}
      description="Đừng lo lắng, việc này chỉ mất chưa đầy 5 phút."
      onNext={handleNext}
    />,
    <Choice
      title={SECTION.GENERAL}
      header="Bạn có đang dùng bất kỳ loại thực phẩm bổ sung nào không?"
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
      header="Bạn dùng thực phẩm bổ sung thường xuyên như thế nào?"
      items={getChoiceItems(3)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.GENERAL}
      header="Bạn đã từng dùng thực phẩm bổ sung trong quá khứ chưa?"
      items={getChoiceItems(4)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.GENERAL}
      header="Giới tính của bạn là gì?"
      items={getChoiceItems(5)}
      onSelect={handleNext}
    />,
    <Input
      title={SECTION.GENERAL}
      description="Bạn bao nhiêu tuổi"
      value={age}
      setValue={setAge}
      hasError={hasError}
      errorMsg="Vui lòng nhập tuổi từ 12 đến 99!"
      handleInput={handleAgeInput}
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
      title="Tuyệt, bây giờ chúng ta đến với mục tiêu của bạn nhé!"
      onNext={handleNext}
    />,
    <Choice
      title={SECTION.GOALS}
      header="Mục đích chính của bạn là gì?"
      items={getChoiceItems(6)}
      onSelect={handleNext}
    />,
    <Page14
      title={SECTION.GOALS}
      header="Bạn muốn cải thiện điều gì?"
      description="Hãy chọn mục tiêu và nhu cầu hiện tại mà bạn muốn tập trung vào, chúng tôi sẽ xây dựng cho bạn một đề xuất phù hợp."
      objectiveIds={selectedObjectives}
      onToggle={handleToggleObjective}
      errorMsg="Vui lòng chọn ít nhất một mục!"
      hasError={hasError}
      handleCheck={handleCheckObjectives}
    />,
    <Choice
      title={SECTION.BRAIN}
      image={ICON.BRAIN}
      header="Đôi khi bạn có gặp khó khăn trong việc tập trung không?"
      items={getChoiceItems(7)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.BRAIN}
      image={ICON.BRAIN}
      header="Bạn có đặc biệt chú ý tới trí nhớ ngắn hạn của mình không?"
      items={getChoiceItems(8)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.ENERGY}
      image={ICON.ENERGY}
      header="Bạn mô tả mức năng lượng của mình như thế nào?"
      items={getChoiceItems(9)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.ENERGY}
      image={ICON.ENERGY}
      header="Bạn bắt đầu cảm thấy mệt mỏi vào thời điểm nào trong ngày?"
      items={getChoiceItems(10)}
      onSelect={handleNext}
    />,
    <ChoiceCheckbox
      title={SECTION.HEART}
      image={ICON.HEART}
      header="Bạn có bệnh tim nào?"
      items={getChoiceItems(11)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <Choice
      title={SECTION.HEART}
      image={ICON.HEART}
      header="Bạn có cảm giác nặng nề ở chân không?"
      items={getChoiceItems(12)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.IMMUNITY}
      image={ICON.IMMUNITY}
      header="Bạn có muốn tăng cường hệ miễn dịch của mình không?"
      items={getChoiceItems(13)}
      onSelect={handleNext}
    />,
    <ChoiceCheckbox
      title={SECTION.SKIN}
      image={ICON.SKIN}
      header="Mối quan tâm chính của bạn về làn da là gì?"
      items={getChoiceItems(14)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <ChoiceCheckbox
      title={SECTION.HAIR}
      image={ICON.HAIR}
      header="Mối quan tâm chính của bạn về tóc là gì?"
      items={getChoiceItems(15)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <ChoiceCheckbox
      title={SECTION.DIGESTION}
      image={ICON.DIGESTION}
      header="Bạn muốn tập trung vào bộ phận nào của hệ tiêu hóa?"
      items={getChoiceItems(16)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <Choice
      title={SECTION.DIGESTION}
      image={ICON.DIGESTION}
      header="Tần suất lượng phân của bạn là bao nhiêu?"
      items={getChoiceItems(17)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.STRESS}
      image={ICON.STRESS}
      header="Sự căng thẳng của bạn được mô tả như sau:"
      items={getChoiceItems(18)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.STRESS}
      image={ICON.STRESS}
      header="Khi nào bạn cảm thấy stress?"
      items={getChoiceItems(19)}
      onSelect={handleNext}
    />,
    <ChoiceCheckbox
      title={SECTION.BONES}
      image={ICON.BONE}
      header="Bạn có đặc biệt chú ý tới xương và khớp của mình không?"
      items={getChoiceItems(20)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <Choice
      title={SECTION.SLEEP}
      image={ICON.MOON}
      header="Bạn có gặp khó khăn khi đi vào giấc ngủ không?"
      items={getChoiceItems(21)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.SLEEP}
      image={ICON.MOON}
      header="Bạn có đôi khi cảm thấy mệt mỏi khi thức dậy không?"
      items={getChoiceItems(22)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.SHAPE}
      image={ICON.APPLE}
      header="Mục tiêu về cân nặng của bạn là gì?"
      items={getChoiceItems(23)}
      onSelect={handleNext}
    />,
    <ChoiceCheckbox
      title={SECTION.SHAPE}
      image={ICON.APPLE}
      header="Bạn có xu hướng..."
      items={getChoiceItems(24)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <ChoiceCheckbox
      title={SECTION.SHAPE}
      image={ICON.APPLE}
      header="Bạn có xu hướng..."
      items={getChoiceItems(25)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <Choice
      title={SECTION.WOMEN_HEALTH}
      image={ICON.WOMEN}
      header="Bạn sẽ mô tả sự thoải mái khi đi tiểu của mình những ngày này như thế nào?"
      items={getChoiceItems(26)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.WOMEN_HEALTH}
      image={ICON.WOMEN}
      header="Bạn có kinh nguyệt bao lâu một lần?"
      items={getChoiceItems(27)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.WOMEN_HEALTH}
      image={ICON.WOMEN}
      header="Bạn có bị hội chứng tiền kinh nguyệt không?"
      description="Hội chứng tiền kinh nguyệt là một loạt các triệu chứng thể chất và tâm lý bắt đầu từ vài giờ đến vài ngày trước kỳ kinh nguyệt (đau, lo âu, khó chịu)."
      items={getChoiceItems(28)}
      onSelect={handleNext}
    />,
    <ChoiceCheckbox
      title={SECTION.WOMEN_HEALTH}
      image={ICON.WOMEN}
      header="Bạn có muốn được giúp đỡ về vấn đề tình dục không?"
      items={getChoiceItems(29)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <ChoiceCheckbox
      title={SECTION.MEN_HEALTH}
      image={ICON.MEN}
      header="Bạn có muốn được giúp đỡ về vấn đề tình dục không?"
      items={getChoiceItems(30)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <Choice
      title={SECTION.SPORT}
      image={ICON.SPORT}
      header="Bạn tập thể dục bao nhiêu lần một tuần?"
      items={getChoiceItems(31)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.SPORT}
      image={ICON.SPORT}
      header="Bạn đang chuẩn bị cho một cuộc thi?"
      items={getChoiceItems(32)}
      onSelect={handleNext}
    />,
    <ChoiceCheckbox
      title={SECTION.SPORT}
      image={ICON.SPORT}
      header="Bạn tập thể dục theo hình thức nào?"
      items={getChoiceItems(33)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <ChoiceCheckbox
      title={SECTION.SPORT}
      image={ICON.SPORT}
      header="Bạn có muốn cải thiện bất kỳ điều nào sau đây không?"
      items={getChoiceItems(34)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <Choice
      title={SECTION.CONCEPTION_MATERNITY}
      image={ICON.PREGNANT}
      header="Tình huống hiện tại của bạn phù hợp nhất với mô tả nào dưới đây?"
      items={getChoiceItems(35)}
      onSelect={handleNext}
    />,
    <LabelAuto
      title="Bây giờ hãy chuyển sang chủ đề về lối sống của bạn!"
      onNext={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn có cho rằng mình có lối sống lành mạnh không?"
      items={getChoiceItems(36)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn ăn cá hoặc hải sản bao nhiêu lần một tuần?"
      items={getChoiceItems(37)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn ăn thịt hoặc trứng bao nhiêu lần một tuần?"
      items={getChoiceItems(38)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn ăn bao nhiêu trái cây và rau quả mỗi ngày?"
      items={getChoiceItems(39)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn ăn bao nhiêu sản phẩm từ sữa mỗi ngày?"
      items={getChoiceItems(40)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn có uống 3 hoặc nhiều lần đồ uống có cồn mỗi ngày không?"
      items={getChoiceItems(41)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn có uống 10 lần đồ uống có cồn trở lên mỗi tuần không?"
      items={getChoiceItems(42)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn sẽ phải phơi nắng trong thời gian tới chứ?"
      items={getChoiceItems(43)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn có dành hơn 3 giờ mỗi ngày để nhìn màn hình máy tính không?"
      items={getChoiceItems(44)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn sẽ mô tả sự thoải mái của mắt mình như thế nào?"
      items={getChoiceItems(45)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bác sĩ có khuyên bạn nên bổ sung sắt không?"
      items={getChoiceItems(46)}
      onSelect={handleNext}
    />,
    <ChoiceCheckbox
      title={SECTION.LIFESTYLE}
      header="Bạn có một trong các dị ứng sau đây không?"
      items={getChoiceItems(47)}
      onSelect={handleNext}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn có đang thực hiện một chế độ ăn kiêng cụ thể nào không?"
      items={getChoiceItems(48)}
      onSelect={handleNext}
    />,
    <Choice
      title={SECTION.LIFESTYLE}
      header="Bạn cảm thấy thế nào về Y học cổ truyền phương Đông?"
      items={getChoiceItems(49)}
      onSelect={handleNext}
    />,
    <ChoiceCheckbox
      title={SECTION.LIFESTYLE}
      header="Câu hỏi cuối cùng: Bạn biết chúng tôi qua đâu?"
      items={getChoiceItems(50)}
      onSelect={finishTest}
      selectedItems={selectedMockItem}
      setSelectedItems={setSelectedMockItem}
    />,
  ];

  return (
    <div className="min-h-screen flex justify-center items-center w-full overflow-hidden relative">
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
        <Route path="recommendation" element={<Recommendation />} />
      </Routes>
    </div>
  );
};

export default TestPage;
