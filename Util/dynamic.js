
/**
 * Interface for the input parameters of the DynamicTool class.
 */
class DynamicToolInput extends ToolParams {
  constructor({ name, description, returnDirect }) {
    super();
    this.name = name;
    this.description = description;
    this.returnDirect = returnDirect;
  }
}

/**
 * A tool that can be created dynamically from a function, name, and description.
 */
class DynamicTool extends Tool {
  static lc_name() {
    return "DynamicTool";
  }

  constructor({ name, description, func, returnDirect }) {
    super(new DynamicToolInput({ name, description, returnDirect }));
    this.name = name;
    this.description = description;
    this.func = func;
  }

  async _call(input, runManager) {
    return this.func(input, runManager);
  }
}

/**
 * A tool that can be created dynamically from a function, name, and
 * description, designed to work with structured data. It extends the
 * StructuredTool class and overrides the _call method to execute the
 * provided function when the tool is called.
 */
class DynamicStructuredTool extends StructuredTool {
  static lc_name() {
    return "DynamicStructuredTool";
  }

  constructor({ name, description, func, returnDirect, schema }) {
    super(new DynamicToolInput({ name, description, returnDirect }));
    this.name = name;
    this.description = description;
    this.func = func;
    this.schema = schema;
  }

  async _call(arg, runManager) {
    return this.func(arg, runManager);
  }
}

module.exports = {
  DynamicTool,
  DynamicStructuredTool,
};
