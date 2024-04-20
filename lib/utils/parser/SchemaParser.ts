// Generated from Schema.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
  ATN,
  ATNDeserializer,
  DecisionState,
  DFA,
  FailedPredicateException,
  RecognitionException,
  NoViableAltException,
  BailErrorStrategy,
  Parser,
  ParserATNSimulator,
  RuleContext,
  ParserRuleContext,
  PredictionMode,
  PredictionContextCache,
  TerminalNode,
  RuleNode,
  Token,
  TokenStream,
  Interval,
  IntervalSet
} from 'antlr4'
import SchemaListener from './SchemaListener.js'
import SchemaVisitor from './SchemaVisitor.js'

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number

export default class SchemaParser extends Parser {
  public static readonly T__0 = 1
  public static readonly T__1 = 2
  public static readonly T__2 = 3
  public static readonly T__3 = 4
  public static readonly T__4 = 5
  public static readonly T__5 = 6
  public static readonly T__6 = 7
  public static readonly T__7 = 8
  public static readonly T__8 = 9
  public static readonly T__9 = 10
  public static readonly T__10 = 11
  public static readonly T__11 = 12
  public static readonly T__12 = 13
  public static readonly T__13 = 14
  public static readonly T__14 = 15
  public static readonly T__15 = 16
  public static readonly T__16 = 17
  public static readonly T__17 = 18
  public static readonly T__18 = 19
  public static readonly T__19 = 20
  public static readonly T__20 = 21
  public static readonly SEMICOLON = 22
  public static readonly CURVED_BRACKET_OPEN = 23
  public static readonly CURVED_BRACKET_CLOSE = 24
  public static readonly BRACKET_OPEN = 25
  public static readonly BRACKET_CLOSE = 26
  public static readonly NAME = 27
  public static readonly NUMBER = 28
  public static readonly NEWLINE = 29
  public static readonly WHITESPACE = 30
  public static readonly EOF = Token.EOF
  public static readonly RULE_schema = 0
  public static readonly RULE_struct = 1
  public static readonly RULE_type = 2
  public static readonly RULE_array = 3
  public static readonly RULE_dimension = 4
  public static readonly RULE_primitiveType = 5
  public static readonly RULE_userType = 6
  public static readonly literalNames: (string | null)[] = [
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
  ]
  public static readonly symbolicNames: (string | null)[] = [
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
  ]
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'schema',
    'struct',
    'type',
    'array',
    'dimension',
    'primitiveType',
    'userType'
  ]
  public get grammarFileName(): string {
    return 'Schema.g4'
  }
  public get literalNames(): (string | null)[] {
    return SchemaParser.literalNames
  }
  public get symbolicNames(): (string | null)[] {
    return SchemaParser.symbolicNames
  }
  public get ruleNames(): string[] {
    return SchemaParser.ruleNames
  }
  public get serializedATN(): number[] {
    return SchemaParser._serializedATN
  }

  protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message)
  }

  constructor(input: TokenStream) {
    super(input)
    this._interp = new ParserATNSimulator(
      this,
      SchemaParser._ATN,
      SchemaParser.DecisionsToDFA,
      new PredictionContextCache()
    )
  }
  // @RuleVersion(0)
  public schema(): SchemaContext {
    let localctx: SchemaContext = new SchemaContext(this, this._ctx, this.state)
    this.enterRule(localctx, 0, SchemaParser.RULE_schema)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 15
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        do {
          {
            {
              this.state = 14
              this.struct()
            }
          }
          this.state = 17
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        } while (_la === 1)
        this.state = 19
        this.match(SchemaParser.EOF)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public struct(): StructContext {
    let localctx: StructContext = new StructContext(this, this._ctx, this.state)
    this.enterRule(localctx, 2, SchemaParser.RULE_struct)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 21
        this.match(SchemaParser.T__0)
        this.state = 22
        this.match(SchemaParser.NAME)
        this.state = 23
        this.match(SchemaParser.CURVED_BRACKET_OPEN)
        this.state = 25
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        do {
          {
            {
              this.state = 24
              this.type_()
            }
          }
          this.state = 27
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        } while ((_la & ~0x1f) === 0 && ((1 << _la) & 138412028) !== 0)
        this.state = 29
        this.match(SchemaParser.CURVED_BRACKET_CLOSE)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public type_(): TypeContext {
    let localctx: TypeContext = new TypeContext(this, this._ctx, this.state)
    this.enterRule(localctx, 4, SchemaParser.RULE_type)
    let _la: number
    try {
      this.state = 49
      this._errHandler.sync(this)
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
          this.enterOuterAlt(localctx, 1)
          {
            this.state = 32
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            do {
              {
                {
                  this.state = 31
                  this.primitiveType()
                }
              }
              this.state = 34
              this._errHandler.sync(this)
              _la = this._input.LA(1)
            } while ((_la & ~0x1f) === 0 && ((1 << _la) & 4194300) !== 0)
            this.state = 36
            this.match(SchemaParser.NAME)
            this.state = 38
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            if (_la === 25) {
              {
                this.state = 37
                this.array()
              }
            }

            this.state = 40
            this.match(SchemaParser.SEMICOLON)
          }
          break
        case 27:
          this.enterOuterAlt(localctx, 2)
          {
            this.state = 42
            this.userType()
            this.state = 43
            this.match(SchemaParser.NAME)
            this.state = 45
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            if (_la === 25) {
              {
                this.state = 44
                this.array()
              }
            }

            this.state = 47
            this.match(SchemaParser.SEMICOLON)
          }
          break
        default:
          throw new NoViableAltException(this)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public array(): ArrayContext {
    let localctx: ArrayContext = new ArrayContext(this, this._ctx, this.state)
    this.enterRule(localctx, 6, SchemaParser.RULE_array)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 52
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        do {
          {
            {
              this.state = 51
              this.dimension()
            }
          }
          this.state = 54
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        } while (_la === 25)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public dimension(): DimensionContext {
    let localctx: DimensionContext = new DimensionContext(this, this._ctx, this.state)
    this.enterRule(localctx, 8, SchemaParser.RULE_dimension)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 56
        this.match(SchemaParser.BRACKET_OPEN)
        this.state = 57
        this.match(SchemaParser.NUMBER)
        this.state = 58
        this.match(SchemaParser.BRACKET_CLOSE)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public primitiveType(): PrimitiveTypeContext {
    let localctx: PrimitiveTypeContext = new PrimitiveTypeContext(this, this._ctx, this.state)
    this.enterRule(localctx, 10, SchemaParser.RULE_primitiveType)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 60
        _la = this._input.LA(1)
        if (!((_la & ~0x1f) === 0 && ((1 << _la) & 4194300) !== 0)) {
          this._errHandler.recoverInline(this)
        } else {
          this._errHandler.reportMatch(this)
          this.consume()
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public userType(): UserTypeContext {
    let localctx: UserTypeContext = new UserTypeContext(this, this._ctx, this.state)
    this.enterRule(localctx, 12, SchemaParser.RULE_userType)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 62
        this.match(SchemaParser.NAME)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }

  public static readonly _serializedATN: number[] = [
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
  ]

  private static __ATN: ATN
  public static get _ATN(): ATN {
    if (!SchemaParser.__ATN) {
      SchemaParser.__ATN = new ATNDeserializer().deserialize(SchemaParser._serializedATN)
    }

    return SchemaParser.__ATN
  }

  static DecisionsToDFA = SchemaParser._ATN.decisionToState.map(
    (ds: DecisionState, index: number) => new DFA(ds, index)
  )
}

export class SchemaContext extends ParserRuleContext {
  constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public EOF(): TerminalNode {
    return this.getToken(SchemaParser.EOF, 0)
  }
  public struct_list(): StructContext[] {
    return this.getTypedRuleContexts(StructContext) as StructContext[]
  }
  public struct(i: number): StructContext {
    return this.getTypedRuleContext(StructContext, i) as StructContext
  }
  public get ruleIndex(): number {
    return SchemaParser.RULE_schema
  }
  public enterRule(listener: SchemaListener): void {
    if (listener.enterSchema) {
      listener.enterSchema(this)
    }
  }
  public exitRule(listener: SchemaListener): void {
    if (listener.exitSchema) {
      listener.exitSchema(this)
    }
  }
  // @Override
  public accept<Result>(visitor: SchemaVisitor<Result>): Result {
    if (visitor.visitSchema) {
      return visitor.visitSchema(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class StructContext extends ParserRuleContext {
  constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public NAME(): TerminalNode {
    return this.getToken(SchemaParser.NAME, 0)
  }
  public CURVED_BRACKET_OPEN(): TerminalNode {
    return this.getToken(SchemaParser.CURVED_BRACKET_OPEN, 0)
  }
  public CURVED_BRACKET_CLOSE(): TerminalNode {
    return this.getToken(SchemaParser.CURVED_BRACKET_CLOSE, 0)
  }
  public type__list(): TypeContext[] {
    return this.getTypedRuleContexts(TypeContext) as TypeContext[]
  }
  public type_(i: number): TypeContext {
    return this.getTypedRuleContext(TypeContext, i) as TypeContext
  }
  public get ruleIndex(): number {
    return SchemaParser.RULE_struct
  }
  public enterRule(listener: SchemaListener): void {
    if (listener.enterStruct) {
      listener.enterStruct(this)
    }
  }
  public exitRule(listener: SchemaListener): void {
    if (listener.exitStruct) {
      listener.exitStruct(this)
    }
  }
  // @Override
  public accept<Result>(visitor: SchemaVisitor<Result>): Result {
    if (visitor.visitStruct) {
      return visitor.visitStruct(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class TypeContext extends ParserRuleContext {
  constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public NAME(): TerminalNode {
    return this.getToken(SchemaParser.NAME, 0)
  }
  public SEMICOLON(): TerminalNode {
    return this.getToken(SchemaParser.SEMICOLON, 0)
  }
  public primitiveType_list(): PrimitiveTypeContext[] {
    return this.getTypedRuleContexts(PrimitiveTypeContext) as PrimitiveTypeContext[]
  }
  public primitiveType(i: number): PrimitiveTypeContext {
    return this.getTypedRuleContext(PrimitiveTypeContext, i) as PrimitiveTypeContext
  }
  public array(): ArrayContext {
    return this.getTypedRuleContext(ArrayContext, 0) as ArrayContext
  }
  public userType(): UserTypeContext {
    return this.getTypedRuleContext(UserTypeContext, 0) as UserTypeContext
  }
  public get ruleIndex(): number {
    return SchemaParser.RULE_type
  }
  public enterRule(listener: SchemaListener): void {
    if (listener.enterType) {
      listener.enterType(this)
    }
  }
  public exitRule(listener: SchemaListener): void {
    if (listener.exitType) {
      listener.exitType(this)
    }
  }
  // @Override
  public accept<Result>(visitor: SchemaVisitor<Result>): Result {
    if (visitor.visitType) {
      return visitor.visitType(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ArrayContext extends ParserRuleContext {
  constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public dimension_list(): DimensionContext[] {
    return this.getTypedRuleContexts(DimensionContext) as DimensionContext[]
  }
  public dimension(i: number): DimensionContext {
    return this.getTypedRuleContext(DimensionContext, i) as DimensionContext
  }
  public get ruleIndex(): number {
    return SchemaParser.RULE_array
  }
  public enterRule(listener: SchemaListener): void {
    if (listener.enterArray) {
      listener.enterArray(this)
    }
  }
  public exitRule(listener: SchemaListener): void {
    if (listener.exitArray) {
      listener.exitArray(this)
    }
  }
  // @Override
  public accept<Result>(visitor: SchemaVisitor<Result>): Result {
    if (visitor.visitArray) {
      return visitor.visitArray(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class DimensionContext extends ParserRuleContext {
  constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public BRACKET_OPEN(): TerminalNode {
    return this.getToken(SchemaParser.BRACKET_OPEN, 0)
  }
  public NUMBER(): TerminalNode {
    return this.getToken(SchemaParser.NUMBER, 0)
  }
  public BRACKET_CLOSE(): TerminalNode {
    return this.getToken(SchemaParser.BRACKET_CLOSE, 0)
  }
  public get ruleIndex(): number {
    return SchemaParser.RULE_dimension
  }
  public enterRule(listener: SchemaListener): void {
    if (listener.enterDimension) {
      listener.enterDimension(this)
    }
  }
  public exitRule(listener: SchemaListener): void {
    if (listener.exitDimension) {
      listener.exitDimension(this)
    }
  }
  // @Override
  public accept<Result>(visitor: SchemaVisitor<Result>): Result {
    if (visitor.visitDimension) {
      return visitor.visitDimension(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class PrimitiveTypeContext extends ParserRuleContext {
  constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public get ruleIndex(): number {
    return SchemaParser.RULE_primitiveType
  }
  public enterRule(listener: SchemaListener): void {
    if (listener.enterPrimitiveType) {
      listener.enterPrimitiveType(this)
    }
  }
  public exitRule(listener: SchemaListener): void {
    if (listener.exitPrimitiveType) {
      listener.exitPrimitiveType(this)
    }
  }
  // @Override
  public accept<Result>(visitor: SchemaVisitor<Result>): Result {
    if (visitor.visitPrimitiveType) {
      return visitor.visitPrimitiveType(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class UserTypeContext extends ParserRuleContext {
  constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public NAME(): TerminalNode {
    return this.getToken(SchemaParser.NAME, 0)
  }
  public get ruleIndex(): number {
    return SchemaParser.RULE_userType
  }
  public enterRule(listener: SchemaListener): void {
    if (listener.enterUserType) {
      listener.enterUserType(this)
    }
  }
  public exitRule(listener: SchemaListener): void {
    if (listener.exitUserType) {
      listener.exitUserType(this)
    }
  }
  // @Override
  public accept<Result>(visitor: SchemaVisitor<Result>): Result {
    if (visitor.visitUserType) {
      return visitor.visitUserType(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}
