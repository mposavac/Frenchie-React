"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NounsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nouns_entity_1 = require("./nouns.entity");
const nouns_controller_1 = require("./nouns.controller");
const nouns_service_1 = require("./nouns.service");
let NounsModule = (() => {
    let NounsModule = class NounsModule {
    };
    NounsModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([nouns_entity_1.NounsEntity])],
            controllers: [nouns_controller_1.NounsController],
            providers: [nouns_service_1.NounsService],
        })
    ], NounsModule);
    return NounsModule;
})();
exports.NounsModule = NounsModule;
//# sourceMappingURL=nouns.module.js.map