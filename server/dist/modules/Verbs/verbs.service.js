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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerbsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const verbs_entity_1 = require("./verbs.entity");
const typeorm_2 = require("typeorm");
const wordsResponse_dto_1 = require("../../utils/wordsResponse.dto");
let VerbsService = (() => {
    let VerbsService = class VerbsService {
        constructor(VerbsRepository) {
            this.VerbsRepository = VerbsRepository;
        }
        async findAll() {
            try {
                const verbs = await this.VerbsRepository.find({});
                const stripedVerbs = verbs.map(noun => ({
                    word: noun.word,
                    translation: noun.translation,
                }));
                return [...stripedVerbs];
            }
            catch (e) {
                throw new common_1.NotFoundException();
            }
        }
    };
    VerbsService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(verbs_entity_1.VerbsEntity)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], VerbsService);
    return VerbsService;
})();
exports.VerbsService = VerbsService;
//# sourceMappingURL=verbs.service.js.map