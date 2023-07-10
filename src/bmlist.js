// 'top' is a keyword though I can't seem to find what it does
(async () => {
let [topNode] = await chrome.bookmarks.getSubTree('1');
	let topPoint = document.getElementById("top");
	topNode.children.map(child => cascade(child, topPoint));
})();

function cascade(node, parentPoint) {
	let point = document.createElement("div");
	point.classList.add("inner");
	parentPoint.append(point);
	if (node.children != undefined) {
		point.classList.add("folder");
		point.innerHTML = `${node.title}`;
		node.children.map(child => cascade(child, point));
	} else {
		favurl = new URL(chrome.runtime.getURL("/_favicon/"));
		favurl.searchParams.set("pageUrl", node.url);
		favurl.searchParams.set("size", "16");
		let img = document.createElement("img");
		img.src = favurl.toString();
		point.append(img);
		point.innerHTML += `<a href=${node.url}>${node.title}</a>`;
	}
}
