export default function CreditCardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 w-96 rounded shadow-lg">
        <button onClick={onClose} className="float-right">
          X
        </button>
        <h2 className="text-xl mb-4">Enter Credit Card Details</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm mb-2">Card Number</label>
            <input
              type="text"
              className="p-2 w-full border rounded"
              placeholder="1234 1234 1234 1234"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Name on Card</label>
            <input type="text" className="p-2 w-full border rounded" />
          </div>
          <div className="flex space-x-4">
            <div className="mb-4">
              <label className="block text-sm mb-2">Expiry Date</label>
              <input
                type="text"
                className="p-2 w-full border rounded"
                placeholder="MM/YY"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">CVV</label>
              <input
                type="text"
                className="p-2 w-full border rounded"
                placeholder="123"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
