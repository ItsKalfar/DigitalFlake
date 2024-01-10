"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./db/index"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const origin = process.env.CORS_ORIGIN;
app.use((0, cors_1.default)({
    origin: origin,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/products", product_route_1.default);
app.use("/api/v1/categories", category_route_1.default);
const startServer = () => {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, index_1.default)();
        startServer();
    });
}
main();
