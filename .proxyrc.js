// Disables COEP HTTP header for parcel development HTTP server
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy
module.exports = function (app) {
	app.use((req, res, next) => {
		res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
		next();
	});
};
