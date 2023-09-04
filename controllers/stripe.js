export const stripeOrderController = async (req, res) => {
	const { items } = req.body;
	const orderAmount = (items) => {
		const totalPrice = items.reduce((acc, item) => {
			let itemTotal;
			if (item.quantity) {
				itemTotal = item.price * item.quantity;
			} else {
				itemTotal = item.price;
			}
			return acc + itemTotal;
		}, 0);
		return totalPrice;
	};
};
