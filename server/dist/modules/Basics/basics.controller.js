"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicsController = void 0;
const common_1 = require("@nestjs/common");
const basics_service_1 = require("./basics.service");
const swagger_1 = require("@nestjs/swagger");
const wordsResponse_dto_1 = require("../../utils/wordsResponse.dto");
let BasicsController = (() => {
    let BasicsController = class BasicsController {
        constructor(basicsService) {
            this.basicsService = basicsService;
        }
        findAll() {
            return this.basicsService.findAll();
        }
    };
    __decorate([
        swagger_1.ApiOkResponse({
            description: 'OK.',
            isArray: true,
            type: wordsResponse_dto_1.WordsResponseDto,
        }),
        common_1.Get(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BasicsController.prototype, "findAll", null);
    BasicsController = __decorate([
        swagger_1.ApiTags('Basics'),
        common_1.Controller('basics'),
        __metadata("design:paramtypes", [basics_service_1.BasicsService])
    ], BasicsController);
    return BasicsController;
})();
exports.BasicsController = BasicsController;
//# sourceMappingURL=basics.controller.js.map