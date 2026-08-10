//----------------------------------------------------------------------
import { EditorState, Compartment, StateEffect } from '@codemirror/state';
import { highlightSelectionMatches } from '@codemirror/search';
import { indentWithTab, history, defaultKeymap, historyKeymap } from '@codemirror/commands';
import { foldGutter, foldKeymap, foldable, foldAll as builtInFoldAll, unfoldAll as builtInUnfoldAll, foldEffect, syntaxTree, indentOnInput, indentUnit, bracketMatching, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { EditorView, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, rectangularSelection, crosshairCursor, highlightActiveLine, keymap } from '@codemirror/view';
//----------------------------------------------------------------------
import { oneDark } from "@codemirror/theme-one-dark";
import { json } from "@codemirror/lang-json";
//----------------------------------------------------------------------
//----------------------------------------------------------------------
export function createEditorState({onUpdate, onChange, onFocus, onBlur, content}) {
  return EditorState.create({
    doc: content,
    extensions: [
      ...buildExtensions(),
      EditorView.updateListener.of((viewUpdate) => {
        // https://discuss.codemirror.net/t/codemirror-6-proper-way-to-listen-for-changes/2395/11
        onUpdate(viewUpdate)
        // doc changed
        if (viewUpdate.docChanged) {
          onChange(viewUpdate.state.doc.toString(), viewUpdate)
        }
        // focus state change
        if (viewUpdate.focusChanged) {
          viewUpdate.view.hasFocus ? onFocus(viewUpdate) : onBlur(viewUpdate)
        }
      })
    ]
  });
}
//----------------------------------------------------------------------
export function createEditorView({ state, parent }) {
  return new EditorView({ state, parent });
}
//----------------------------------------------------------------------
export function destroyEditorView(view) {
  view.destroy();
}
//----------------------------------------------------------------------
function buildExtensions(options = { oneDark: true, readOnly: false, lineWrapping: true}) {
  const extensions = [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    history(),
    foldGutter(),
    drawSelection(),
    indentUnit.of("  "),
    EditorState.allowMultipleSelections.of(true),
    EditorState.readOnly.of(options.readOnly),
    indentOnInput(),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    rectangularSelection(),
    crosshairCursor(),
    highlightActiveLine(),
    highlightSelectionMatches(),
    keymap.of([
        indentWithTab,
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
    ]),
    json(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true })
  ];

  if (options.oneDark)
    extensions.push(oneDark);

  if (options.lineWrapping)
    extensions.push(EditorView.lineWrapping);

  return extensions;

}
//----------------------------------------------------------------------
export function getEditorController(view) {
  
  const getDoc = () => view.state.doc.toString();
  const setDoc = (newDoc) => {
    if (newDoc !== getDoc()) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: newDoc
        }
      })
    }
  }

  const toggleDisabled = createEditorExtensionToggler(view, [
    EditorView.editable.of(false),
    EditorState.readOnly.of(true)
  ])


  function toggleCodeFolding(expanded) {
    console.log('expanded?', expanded)
    if(expanded) {
      builtInUnfoldAll(view);
    } else {
      foldAll(view);
    }
  }

  function foldAll(view) {
    const { state } = view;
    const effects = [];
    const seen = new Set();

    // Walk the syntax tree and ask the fold logic for a range for each node
    syntaxTree(state).iterate({
      enter(node) {
        // get the line boundaries for the node's start to be safe
        const line = state.doc.lineAt(node.from);
        const range = foldable(state, line.from, line.to);
        if (range) {
          const key = `${range.from}:${range.to}`;
          if (!seen.has(key)) {
            seen.add(key);
            effects.push(foldEffect.of(range));
          }
        }
      }
    });

    if (effects.length) view.dispatch({ effects });
  }

  return {
    getDoc,
    setDoc,
    toggleDisabled,
    toggleCodeFolding
  }
}
//----------------------------------------------------------------------
const createEditorExtensionToggler = (view, extension) => {
  const { compartment, run } = createEditorCompartment(view)
  return (targetApply) => {
    const exExtension = compartment.get(view.state)
    const apply = targetApply ?? exExtension !== extension
    run(apply ? extension : [])
  }
}
//----------------------------------------------------------------------
const createEditorCompartment = (view) => {
  const compartment = new Compartment()
  const run = (extension) => {
    compartment.get(view.state)
      ? view.dispatch({ effects: compartment.reconfigure(extension) }) // reconfigure
      : view.dispatch({ effects: StateEffect.appendConfig.of(compartment.of(extension)) }) // inject
  }
  return { compartment, run }
}
//----------------------------------------------------------------------