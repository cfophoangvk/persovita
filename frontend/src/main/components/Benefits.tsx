const Benefits: React.FC = () => (
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
      <div className="text-amber-500 text-3xl font-bold mb-2">🌿</div>
      <h3 className="font-semibold text-lg">Natural Ingredients</h3>
      <p className="text-sm text-gray-500 mt-2">Only the best for your body</p>
    </div>
    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
      <div className="text-amber-500 text-3xl font-bold mb-2">✅</div>
      <h3 className="font-semibold text-lg">High Quality</h3>
      <p className="text-sm text-gray-500 mt-2">Laboratory tested for purity</p>
    </div>
    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
      <div className="text-amber-500 text-3xl font-bold mb-2">🚚</div>
      <h3 className="font-semibold text-lg">Fast Delivery</h3>
      <p className="text-sm text-gray-500 mt-2">
        From our warehouse to your door
      </p>
    </div>
  </div>
);

export default Benefits;
