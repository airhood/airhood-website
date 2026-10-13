// VS Code "Dark+" 색 — Prism은 변수/함수 호출/클래스 이름을 구분하지 않아서,
// 줄 앞뒤 문맥을 보고 직접 나눠 색을 입힌다 (파이썬 기준)

export const C = {
  text: '#D4D4D4',
  keywordControl: '#C586C0', // if for return import ...
  keyword: '#569CD6',        // def class in not and or None True False self
  func: '#DCDCAA',
  cls: '#4EC9B0',
  variable: '#9CDCFE',
  constant: '#4FC1FF',
  string: '#CE9178',
  number: '#B5CEA8',
  comment: '#6A9955',
} as const;

const CONTROL = new Set([
  'if', 'elif', 'else', 'for', 'while', 'return', 'import', 'from', 'try', 'except', 'finally',
  'with', 'as', 'break', 'continue', 'pass', 'raise', 'yield', 'assert', 'del', 'global', 'nonlocal', 'await', 'async',
]);
const KEYWORD = new Set(['def', 'class', 'lambda', 'in', 'not', 'and', 'or', 'is', 'None', 'True', 'False']);
const TYPE_NAMES = new Set(['int', 'float', 'str', 'bool', 'list', 'dict', 'set', 'tuple', 'bytes', 'object', 'type', 'range']);

export interface Piece {
  text: string;
  color: string;
}

type TokenLike = { types: string[]; content: string };

/** 토큰 하나를 (필요하면 쪼개서) 색이 입혀진 조각들로 바꾼다 */
export function colorToken(token: TokenLike, lineText: string, offset: number): Piece[] {
  const { types, content } = token;
  const has = (t: string) => types.includes(t);

  if (has('comment')) return [{ text: content, color: C.comment }];
  if (has('string') || has('triple-quoted-string') || has('char')) return [{ text: content, color: C.string }];
  if (has('number')) return [{ text: content, color: C.number }];
  if (has('decorator') || has('annotation')) return [{ text: content, color: C.func }];
  if (has('function')) return [{ text: content, color: C.func }];
  if (has('class-name')) return [{ text: content, color: C.cls }];
  if (has('builtin')) return [{ text: content, color: TYPE_NAMES.has(content.trim()) ? C.cls : C.func }];
  if (has('boolean')) return [{ text: content, color: C.keyword }];
  if (has('keyword')) {
    const w = content.trim();
    if (CONTROL.has(w)) return [{ text: content, color: C.keywordControl }];
    if (KEYWORD.has(w)) return [{ text: content, color: C.keyword }];
    return [{ text: content, color: C.keywordControl }];
  }
  if (has('operator') || has('punctuation')) return [{ text: content, color: C.text }];

  // 일반 글씨: 이름(식별자)을 문맥으로 분류
  const parts = content.split(/([A-Za-z_]\w*)/);
  const out: Piece[] = [];
  let pos = offset;
  const isImportLine = /^\s*(import|from)\b/.test(lineText);
  for (const part of parts) {
    if (!part) continue;
    if (!/^[A-Za-z_]\w*$/.test(part)) {
      out.push({ text: part, color: C.text });
    } else {
      const before = lineText.slice(0, pos);
      const after = lineText.slice(pos + part.length);
      let color: string = C.variable;
      if (CONTROL.has(part)) color = C.keywordControl;
      else if (KEYWORD.has(part)) color = C.keyword;
      else if (part === 'self' || part === 'cls') color = C.keyword;
      else if (isImportLine) color = C.cls;
      else if (/\bdef\s+$/.test(before)) color = C.func;
      else if (/\bclass\s+$/.test(before)) color = C.cls;
      else if (/^\s*\(/.test(after)) color = /^_*[A-Z][a-z]|^_*[A-Z]+[a-z]|^_*[A-Z][A-Za-z0-9]*_\d/.test(part) ? C.cls : C.func;
      else if (/^_*[A-Z][A-Z0-9_]*$/.test(part) && part.replace(/_/g, '').length > 1) color = C.constant;
      else if (/^_*[A-Z][a-z]/.test(part) || /^_*[A-Z][A-Za-z0-9]*_\d+$/.test(part)) color = C.cls;
      else if (TYPE_NAMES.has(part)) color = C.cls;
      out.push({ text: part, color });
    }
    pos += part.length;
  }
  return out;
}
