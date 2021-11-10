class Delimiters {
  public static LINE_COMMENT = "//";
  public static START_COMMENT = "/*";
  public static END_COMMENT = "*/";
  public static DELIMITERS = ["(", ")", "{", "}", "[", "]", "\\", "\"", "\'", ";", ",", this.LINE_COMMENT, this.START_COMMENT, this.END_COMMENT, "\\.", ":"];
}

export { Delimiters }