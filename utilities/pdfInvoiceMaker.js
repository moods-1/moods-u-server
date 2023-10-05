const PDFDocument = require('pdfkit');
const path = require('path');

exports.invoiceMaker = async (res, items, date, orderId, username, email) => {
	let total = 0;
	const doc = new PDFDocument({ margin: 50, size: 'A4' });
	doc.pipe(res);
	doc.moveDown(4);
	doc.image(path.join(__dirname, '../brandDark.png'), doc.x, doc.y, {
		width: 90,
		scale: 1.0,
	});
	doc.moveDown();
	doc.font('Helvetica');
	doc.fontSize(12);
	doc.text(`Invoice: ${orderId}`, { lineGap: 8 });
	doc.text(`Order date: ${date}`, { lineGap: 8 });
	doc.text(`Customer: ${username}`, { lineGap: 8 });
	doc.text(`Email: ${email}`);
	doc.moveDown(8);
	doc.font('Helvetica-Bold').text('Course');
	doc.moveUp();
	doc.font('Helvetica-Bold').text('Price', { align: 'right' });
	doc.font('Helvetica');
	doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
	doc.moveDown(2);
	items.forEach((item) => {
		total += item.price;
		doc.text(`${item.title}`);
		doc.moveUp();
		doc.text(`$${item.price}`, { align: 'right', lineGap: 8 });
	});
	doc
		.moveTo(50, doc.y + 10)
		.lineTo(550, doc.y + 10)
		.stroke();
	doc.moveDown(2);
	doc.font('Helvetica-Bold');
	doc.fontSize(12).text('Order Total:');
	doc.moveUp();
	doc.fontSize(12).text(`$${total}`, { align: 'right' });
	doc.end();
};
