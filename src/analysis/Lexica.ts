import { ArithmeticOperator } from "../groups/ArithmeticOperator";
import { Delimiters } from "../groups/Delimiters";
import { LogicalOperator } from "../groups/LogicalOperator";
import { RelationalOperator } from "../groups/RelationalOperator";
import { ReservedWords } from "../groups/ReservedWords";
import { isAlphabetic, isNumeric } from "../utils/verifyCharacter";

class Lexica {
  log = '';
  ignore = false;
  comment = false;
  
  analysis(code: string) {    
    let words: string[] = [];
    let numberLine = 0;
    let classified = false;

    // Quebrando todo o código em linhas
    let lines = code.split('\n');

    // Percorrendo cada linha digitada
    for (const line of lines) {
      numberLine++;

      // Quebrando a linha em palavras
      words = line.split(' ');
      
      // Percorrendo cada palavra digitada
      for (let word of words) {
        classified = false;

        if (word.length === 0) {
          continue;
        }

        if (word.includes(Delimiters.END_COMMENT)) {
          this.ignore = false;
        }

        if (this.ignore) {
          continue;
        }

        if (!isNaN(Number(word))) {
          this.log += `Linha: ${numberLine} [ ${word} NUMERICO ]\n`;
          continue;
        }

        for (const delimitador of Delimiters.DELIMITERS) {			
					if (word === delimitador) {
            this.log += `Linha: ${numberLine} [ ${word} DELIMITADOR ]\n`;
						classified = true;
						break;
					}
				}

        for (const operator of ArithmeticOperator.ARITHMETIC_OPERATOR) {
					if (word === operator) {
						this.log += `Linha: ${numberLine} [ ${word} OPERADOR ARITIMETICO ]\n`;
						classified = true;
						break;
					}
				}

        for (const operator of LogicalOperator.LOGICAL_OPERATOR) {
					if (word === operator) {
						this.log += `Linha: ${numberLine} [ ${word} OPERADOR LÓGICO ]\n`;
						classified = true;
						break;
					}
				}

        for (const operator of RelationalOperator.RELATIONAL_OPERATOR) {
					if (word === operator) {
						this.log += `Linha: ${numberLine} [ ${word} OPERADOR RELACIONAL ]\n`;
						classified = true;
						break;
					}
				}

        for (const operator of ReservedWords.RESERVED_WORDS) {
					if (word === operator) {
						this.log += `Linha: ${numberLine} [ ${word} PALAVRA RESERVADA ]\n`;
						classified = true;
						break;
					}
				}

        if (word === Delimiters.LINE_COMMENT) {
          break;
        }

        if (word === Delimiters.START_COMMENT) {
          this.ignore = true;
          break;
        }

        if (!classified) {
          this.scannerIdentificador(word, numberLine);

          if (this.comment) {
            this.comment = false;
            break;
          }
        }
        
      }
    }

    return this.log;
  }

  scannerIdentificador(word: string, line: number) {
    let logAux = '';
    let index = 0;
    let classified = false;
    
    // verificando se é o final de um comentário
    if (word.includes(Delimiters.END_COMMENT)) {
      this.log += `Linha: ${line} [ ${word} DELIMITADOR ]\n`;
      index = word.indexOf(Delimiters.END_COMMENT) + 2; // pegando o indice após o delimitador
    }

    // analisando a palavra para ver se é um identificador
    for (; index < word.length; index++) {
      if (isAlphabetic(word[0])) {
        if (isAlphabetic(word[index]) || !isNumeric(word[index])) {
          logAux += word[index];
        } else {
          break;
        }
      } else {                
        break;
      }    
    }

    if (logAux.length > 0) {
      this.log += `Linha: ${line} [ ${logAux} IDENTIFICADOR ]\n`;
    }

    if (index >= word.length) return;

    // Comentarios
    if (index + 2 <= word.length) {
      // Verifiacndo se é um comentário linha
      if (word.substring(index, index + 2) === Delimiters.LINE_COMMENT) {
        this.comment = true;
        this.log += `Linha: ${line} [ ${Delimiters.LINE_COMMENT} DELIMITADOR ]\n`;
        return;
      }

      // Verifiacndo se é um comentário de várias linhas
      if (word.substring(index, index + 2) === Delimiters.START_COMMENT) {
        this.ignore = true;
        this.log += `Linha: ${line} [ ${Delimiters.START_COMMENT} DELIMITADOR ]\n`;
        return;
      }
    }

    // Verifiacndo se é um erro lexico
    if (logAux.length === 0 && !this.comment) {
      this.log += `Linha: ${line} [ ´${word}´ ERRO LÉXICO ]\n`;
    }
  }
}

export { Lexica }