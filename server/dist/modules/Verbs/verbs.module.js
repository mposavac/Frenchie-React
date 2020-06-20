"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerbsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const verbs_entity_1 = require("./verbs.entity");
const verbs_controller_1 = require("./verbs.controller");
const verbs_service_1 = require("./verbs.service");
let VerbsModule = (() => {
    let VerbsModule = class VerbsModule {
    };
    VerbsModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([verbs_entity_1.VerbsEntity])],
            controllers: [verbs_controller_1.VerbsController],
            providers: [verbs_service_1.VerbsService],
        })
    ], VerbsModule);
    return VerbsModule;
})();
exports.VerbsModule = VerbsModule;
//# sourceMappingURL=verbs.module.js.map