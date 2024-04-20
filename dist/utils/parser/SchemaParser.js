'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var antlr4 = require('antlr4');

class SchemaParser extends antlr4.Parser {
    get grammarFileName() {
        return 'Schema.g4';
    }
    get literalNames() {
        return SchemaParser.literalNames;
    }
    get symbolicNames() {
        return SchemaParser.symbolicNames;
    }
    get ruleNames() {
        return SchemaParser.ruleNames;
    }
    get serializedATN() {
        return SchemaParser._serializedATN;
    }
    createFailedPredicateException(predicate, message) {
        return new antlr4.FailedPredicateException(this, predicate, message);
    }
    constructor(input) {
        super(input);
        this._interp = new antlr4.ParserATNSimulator(this, SchemaParser._ATN, SchemaParser.DecisionsToDFA, new antlr4.PredictionContextCache());
    }
    schema() {
        let localctx = new SchemaContext(this, this._ctx, this.state);
        this.enterRule(localctx, 0, SchemaParser.RULE_schema);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 15;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 14;
                            this.struct();
                        }
                    }
                    this.state = 17;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while (_la === 1);
                this.state = 19;
                this.match(SchemaParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr4.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    struct() {
        let localctx = new StructContext(this, this._ctx, this.state);
        this.enterRule(localctx, 2, SchemaParser.RULE_struct);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 21;
                this.match(SchemaParser.T__0);
                this.state = 22;
                this.match(SchemaParser.NAME);
                this.state = 23;
                this.match(SchemaParser.CURVED_BRACKET_OPEN);
                this.state = 25;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 24;
                            this.type_();
                        }
                    }
                    this.state = 27;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while ((_la & ~0x1f) === 0 && ((1 << _la) & 138412028) !== 0);
                this.state = 29;
                this.match(SchemaParser.CURVED_BRACKET_CLOSE);
            }
        }
        catch (re) {
            if (re instanceof antlr4.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    type_() {
        let localctx = new TypeContext(this, this._ctx, this.state);
        this.enterRule(localctx, 4, SchemaParser.RULE_type);
        let _la;
        try {
            this.state = 49;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 32;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        do {
                            {
                                {
                                    this.state = 31;
                                    this.primitiveType();
                                }
                            }
                            this.state = 34;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        } while ((_la & ~0x1f) === 0 && ((1 << _la) & 4194300) !== 0);
                        this.state = 36;
                        this.match(SchemaParser.NAME);
                        this.state = 38;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === 25) {
                            {
                                this.state = 37;
                                this.array();
                            }
                        }
                        this.state = 40;
                        this.match(SchemaParser.SEMICOLON);
                    }
                    break;
                case 27:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 42;
                        this.userType();
                        this.state = 43;
                        this.match(SchemaParser.NAME);
                        this.state = 45;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === 25) {
                            {
                                this.state = 44;
                                this.array();
                            }
                        }
                        this.state = 47;
                        this.match(SchemaParser.SEMICOLON);
                    }
                    break;
                default:
                    throw new antlr4.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr4.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    array() {
        let localctx = new ArrayContext(this, this._ctx, this.state);
        this.enterRule(localctx, 6, SchemaParser.RULE_array);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 52;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 51;
                            this.dimension();
                        }
                    }
                    this.state = 54;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while (_la === 25);
            }
        }
        catch (re) {
            if (re instanceof antlr4.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    dimension() {
        let localctx = new DimensionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 8, SchemaParser.RULE_dimension);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 56;
                this.match(SchemaParser.BRACKET_OPEN);
                this.state = 57;
                this.match(SchemaParser.NUMBER);
                this.state = 58;
                this.match(SchemaParser.BRACKET_CLOSE);
            }
        }
        catch (re) {
            if (re instanceof antlr4.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    primitiveType() {
        let localctx = new PrimitiveTypeContext(this, this._ctx, this.state);
        this.enterRule(localctx, 10, SchemaParser.RULE_primitiveType);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 60;
                _la = this._input.LA(1);
                if (!((_la & ~0x1f) === 0 && ((1 << _la) & 4194300) !== 0)) {
                    this._errHandler.recoverInline(this);
                }
                else {
                    this._errHandler.reportMatch(this);
                    this.consume();
                }
            }
        }
        catch (re) {
            if (re instanceof antlr4.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    userType() {
        let localctx = new UserTypeContext(this, this._ctx, this.state);
        this.enterRule(localctx, 12, SchemaParser.RULE_userType);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 62;
                this.match(SchemaParser.NAME);
            }
        }
        catch (re) {
            if (re instanceof antlr4.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    static get _ATN() {
        if (!SchemaParser.__ATN) {
            SchemaParser.__ATN = new antlr4.ATNDeserializer().deserialize(SchemaParser._serializedATN);
        }
        return SchemaParser.__ATN;
    }
}
SchemaParser.T__0 = 1;
SchemaParser.T__1 = 2;
SchemaParser.T__2 = 3;
SchemaParser.T__3 = 4;
SchemaParser.T__4 = 5;
SchemaParser.T__5 = 6;
SchemaParser.T__6 = 7;
SchemaParser.T__7 = 8;
SchemaParser.T__8 = 9;
SchemaParser.T__9 = 10;
SchemaParser.T__10 = 11;
SchemaParser.T__11 = 12;
SchemaParser.T__12 = 13;
SchemaParser.T__13 = 14;
SchemaParser.T__14 = 15;
SchemaParser.T__15 = 16;
SchemaParser.T__16 = 17;
SchemaParser.T__17 = 18;
SchemaParser.T__18 = 19;
SchemaParser.T__19 = 20;
SchemaParser.T__20 = 21;
SchemaParser.SEMICOLON = 22;
SchemaParser.CURVED_BRACKET_OPEN = 23;
SchemaParser.CURVED_BRACKET_CLOSE = 24;
SchemaParser.BRACKET_OPEN = 25;
SchemaParser.BRACKET_CLOSE = 26;
SchemaParser.NAME = 27;
SchemaParser.NUMBER = 28;
SchemaParser.NEWLINE = 29;
SchemaParser.WHITESPACE = 30;
SchemaParser.EOF = antlr4.Token.EOF;
SchemaParser.RULE_schema = 0;
SchemaParser.RULE_struct = 1;
SchemaParser.RULE_type = 2;
SchemaParser.RULE_array = 3;
SchemaParser.RULE_dimension = 4;
SchemaParser.RULE_primitiveType = 5;
SchemaParser.RULE_userType = 6;
SchemaParser.literalNames = [
    null,
    "'struct'",
    "'char'",
    "'char16_t'",
    "'char32_t'",
    "'wchar_t'",
    "'unsigned'",
    "'signed'",
    "'short'",
    "'int'",
    "'long'",
    "'int8_t'",
    "'int16_t'",
    "'int32_t'",
    "'int64_t'",
    "'uint8_t'",
    "'uint16_t'",
    "'uint32_t'",
    "'uint64_t'",
    "'float'",
    "'double'",
    "'bool'",
    "';'",
    "'{'",
    "'}'",
    "'['",
    "']'",
    null,
    null,
    null,
    "' '"
];
SchemaParser.symbolicNames = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    'SEMICOLON',
    'CURVED_BRACKET_OPEN',
    'CURVED_BRACKET_CLOSE',
    'BRACKET_OPEN',
    'BRACKET_CLOSE',
    'NAME',
    'NUMBER',
    'NEWLINE',
    'WHITESPACE'
];
SchemaParser.ruleNames = [
    'schema',
    'struct',
    'type',
    'array',
    'dimension',
    'primitiveType',
    'userType'
];
SchemaParser._serializedATN = [
    4, 1, 30, 65, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7, 6, 1, 0, 4, 0, 16, 8,
    0, 11, 0, 12, 0, 17, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 26, 8, 1, 11, 1, 12, 1, 27, 1, 1, 1, 1, 1, 2, 4, 2,
    33, 8, 2, 11, 2, 12, 2, 34, 1, 2, 1, 2, 3, 2, 39, 8, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3, 2, 46, 8, 2, 1, 2, 1, 2, 3,
    2, 50, 8, 2, 1, 3, 4, 3, 53, 8, 3, 11, 3, 12, 3, 54, 1, 4, 1, 4, 1, 4, 1, 4, 1, 5, 1, 5, 1, 6, 1, 6, 1, 6, 0, 0, 7,
    0, 2, 4, 6, 8, 10, 12, 0, 1, 1, 0, 2, 21, 64, 0, 15, 1, 0, 0, 0, 2, 21, 1, 0, 0, 0, 4, 49, 1, 0, 0, 0, 6, 52, 1, 0,
    0, 0, 8, 56, 1, 0, 0, 0, 10, 60, 1, 0, 0, 0, 12, 62, 1, 0, 0, 0, 14, 16, 3, 2, 1, 0, 15, 14, 1, 0, 0, 0, 16, 17, 1,
    0, 0, 0, 17, 15, 1, 0, 0, 0, 17, 18, 1, 0, 0, 0, 18, 19, 1, 0, 0, 0, 19, 20, 5, 0, 0, 1, 20, 1, 1, 0, 0, 0, 21, 22,
    5, 1, 0, 0, 22, 23, 5, 27, 0, 0, 23, 25, 5, 23, 0, 0, 24, 26, 3, 4, 2, 0, 25, 24, 1, 0, 0, 0, 26, 27, 1, 0, 0, 0,
    27, 25, 1, 0, 0, 0, 27, 28, 1, 0, 0, 0, 28, 29, 1, 0, 0, 0, 29, 30, 5, 24, 0, 0, 30, 3, 1, 0, 0, 0, 31, 33, 3, 10,
    5, 0, 32, 31, 1, 0, 0, 0, 33, 34, 1, 0, 0, 0, 34, 32, 1, 0, 0, 0, 34, 35, 1, 0, 0, 0, 35, 36, 1, 0, 0, 0, 36, 38, 5,
    27, 0, 0, 37, 39, 3, 6, 3, 0, 38, 37, 1, 0, 0, 0, 38, 39, 1, 0, 0, 0, 39, 40, 1, 0, 0, 0, 40, 41, 5, 22, 0, 0, 41,
    50, 1, 0, 0, 0, 42, 43, 3, 12, 6, 0, 43, 45, 5, 27, 0, 0, 44, 46, 3, 6, 3, 0, 45, 44, 1, 0, 0, 0, 45, 46, 1, 0, 0,
    0, 46, 47, 1, 0, 0, 0, 47, 48, 5, 22, 0, 0, 48, 50, 1, 0, 0, 0, 49, 32, 1, 0, 0, 0, 49, 42, 1, 0, 0, 0, 50, 5, 1, 0,
    0, 0, 51, 53, 3, 8, 4, 0, 52, 51, 1, 0, 0, 0, 53, 54, 1, 0, 0, 0, 54, 52, 1, 0, 0, 0, 54, 55, 1, 0, 0, 0, 55, 7, 1,
    0, 0, 0, 56, 57, 5, 25, 0, 0, 57, 58, 5, 28, 0, 0, 58, 59, 5, 26, 0, 0, 59, 9, 1, 0, 0, 0, 60, 61, 7, 0, 0, 0, 61,
    11, 1, 0, 0, 0, 62, 63, 5, 27, 0, 0, 63, 13, 1, 0, 0, 0, 7, 17, 27, 34, 38, 45, 49, 54
];
SchemaParser.DecisionsToDFA = SchemaParser._ATN.decisionToState.map((ds, index) => new antlr4.DFA(ds, index));
class SchemaContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    EOF() {
        return this.getToken(SchemaParser.EOF, 0);
    }
    struct_list() {
        return this.getTypedRuleContexts(StructContext);
    }
    struct(i) {
        return this.getTypedRuleContext(StructContext, i);
    }
    get ruleIndex() {
        return SchemaParser.RULE_schema;
    }
    enterRule(listener) {
        if (listener.enterSchema) {
            listener.enterSchema(this);
        }
    }
    exitRule(listener) {
        if (listener.exitSchema) {
            listener.exitSchema(this);
        }
    }
    accept(visitor) {
        if (visitor.visitSchema) {
            return visitor.visitSchema(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
class StructContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    NAME() {
        return this.getToken(SchemaParser.NAME, 0);
    }
    CURVED_BRACKET_OPEN() {
        return this.getToken(SchemaParser.CURVED_BRACKET_OPEN, 0);
    }
    CURVED_BRACKET_CLOSE() {
        return this.getToken(SchemaParser.CURVED_BRACKET_CLOSE, 0);
    }
    type__list() {
        return this.getTypedRuleContexts(TypeContext);
    }
    type_(i) {
        return this.getTypedRuleContext(TypeContext, i);
    }
    get ruleIndex() {
        return SchemaParser.RULE_struct;
    }
    enterRule(listener) {
        if (listener.enterStruct) {
            listener.enterStruct(this);
        }
    }
    exitRule(listener) {
        if (listener.exitStruct) {
            listener.exitStruct(this);
        }
    }
    accept(visitor) {
        if (visitor.visitStruct) {
            return visitor.visitStruct(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
class TypeContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    NAME() {
        return this.getToken(SchemaParser.NAME, 0);
    }
    SEMICOLON() {
        return this.getToken(SchemaParser.SEMICOLON, 0);
    }
    primitiveType_list() {
        return this.getTypedRuleContexts(PrimitiveTypeContext);
    }
    primitiveType(i) {
        return this.getTypedRuleContext(PrimitiveTypeContext, i);
    }
    array() {
        return this.getTypedRuleContext(ArrayContext, 0);
    }
    userType() {
        return this.getTypedRuleContext(UserTypeContext, 0);
    }
    get ruleIndex() {
        return SchemaParser.RULE_type;
    }
    enterRule(listener) {
        if (listener.enterType) {
            listener.enterType(this);
        }
    }
    exitRule(listener) {
        if (listener.exitType) {
            listener.exitType(this);
        }
    }
    accept(visitor) {
        if (visitor.visitType) {
            return visitor.visitType(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
class ArrayContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    dimension_list() {
        return this.getTypedRuleContexts(DimensionContext);
    }
    dimension(i) {
        return this.getTypedRuleContext(DimensionContext, i);
    }
    get ruleIndex() {
        return SchemaParser.RULE_array;
    }
    enterRule(listener) {
        if (listener.enterArray) {
            listener.enterArray(this);
        }
    }
    exitRule(listener) {
        if (listener.exitArray) {
            listener.exitArray(this);
        }
    }
    accept(visitor) {
        if (visitor.visitArray) {
            return visitor.visitArray(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
class DimensionContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    BRACKET_OPEN() {
        return this.getToken(SchemaParser.BRACKET_OPEN, 0);
    }
    NUMBER() {
        return this.getToken(SchemaParser.NUMBER, 0);
    }
    BRACKET_CLOSE() {
        return this.getToken(SchemaParser.BRACKET_CLOSE, 0);
    }
    get ruleIndex() {
        return SchemaParser.RULE_dimension;
    }
    enterRule(listener) {
        if (listener.enterDimension) {
            listener.enterDimension(this);
        }
    }
    exitRule(listener) {
        if (listener.exitDimension) {
            listener.exitDimension(this);
        }
    }
    accept(visitor) {
        if (visitor.visitDimension) {
            return visitor.visitDimension(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
class PrimitiveTypeContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    get ruleIndex() {
        return SchemaParser.RULE_primitiveType;
    }
    enterRule(listener) {
        if (listener.enterPrimitiveType) {
            listener.enterPrimitiveType(this);
        }
    }
    exitRule(listener) {
        if (listener.exitPrimitiveType) {
            listener.exitPrimitiveType(this);
        }
    }
    accept(visitor) {
        if (visitor.visitPrimitiveType) {
            return visitor.visitPrimitiveType(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
class UserTypeContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    NAME() {
        return this.getToken(SchemaParser.NAME, 0);
    }
    get ruleIndex() {
        return SchemaParser.RULE_userType;
    }
    enterRule(listener) {
        if (listener.enterUserType) {
            listener.enterUserType(this);
        }
    }
    exitRule(listener) {
        if (listener.exitUserType) {
            listener.exitUserType(this);
        }
    }
    accept(visitor) {
        if (visitor.visitUserType) {
            return visitor.visitUserType(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}

exports.ArrayContext = ArrayContext;
exports.DimensionContext = DimensionContext;
exports.PrimitiveTypeContext = PrimitiveTypeContext;
exports.SchemaContext = SchemaContext;
exports.StructContext = StructContext;
exports.TypeContext = TypeContext;
exports.UserTypeContext = UserTypeContext;
exports.default = SchemaParser;
