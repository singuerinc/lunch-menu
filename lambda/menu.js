import scrape from "scrape-it";

const API_ENDPOINT = `https://internationalschoolofthestockholmregion.stockholm.se/lunch-menu`;
const strip = x =>
	x
		.replace(/\&#xA0;/gi, "")
		.replace(/\<strong\>[\D]+\:\<\/strong\>/gi, "")
		.trim();
const container =
	"#block-system-main > div > article > div.panel-pane.pane-entity-field.pane-node-body > div > div > div";
const what = n => ({
	selector: `${container} > p:nth-child(${n})`,
	how: "html",
	convert: x => strip(x)
});

exports.handler = async () => {
	return new Promise((resolve, reject) => {
		scrape(API_ENDPOINT, {
			week: `${container} > p:nth-child(1) > u > strong`,
			monday: what(2),
			tuesday: what(3),
			wednesday: what(4),
			thursday: what(5),
			friday: what(6)
		}).then(({ data, response }) => {
			console.log(data);

			resolve({
				statusCode: 200,
				body: JSON.stringify({
					week: data.week,
					menu: [
						data.monday,
						data.tuesday,
						data.wednesday,
						data.thursday,
						data.friday
					]
				})
			});
		});
	});
};
