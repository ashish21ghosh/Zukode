const contentEditableHelper = (() => {
  const ENTER_KEY = 13;
  const TAB_KEY = 9;
  const aTab = '\t';
  

  const handleKeyDown = (e) => {
    keyComboEvent(e);
  }

  function keyComboEvent(e) {
    const key = e.keyCode,
          metaKey = e.metaKey;
          shiftKey = e.shiftKey;
          target = e.currentTarget || e.srcElement;

    let sel,
        selStart, 
        selEnd;

    let text = target.value;

    if (typeof target.selectionStart === 'number') {
      selStart = target.selectionStart;
      selEnd = target.selectionEnd;
      sel = text.slice(selStart, selEnd);
    } else {
      return;
    } 

    if (key === TAB_KEY && shiftKey) {
      // call untab function 
      untabbing(target, sel, selStart, selEnd);
    } else if (key === TAB_KEY) {
      // call tab function 
      tabbing(target, sel, selStart, selEnd);
    } 
    // else if (key === ENTER_KEY && shiftKey) {
    //   // call submit function 
    //   return 'SUBMIT';
    // } else if (key === ENTER_KEY && metaKey) {
    //   // call submit and create function 
    //   return 'CREATE';
    // } else if (key === ENTER_KEY) {
    //   // call check tab function
    // }
  }

  function tabbing(target, sel, selStart, selEnd) {
    let tab = aTab,
        tabLen = tab.length,
        numTabs = 0,
        text = target.value,
        initScrollTop = target.scrollTop;

    let lineArr = getSelectionEdges(text, selStart, selEnd);
    startLine = lineArr[0];
    endLine = lineArr[1];
    

    /* get the text selection
    /* note No support for IE yet
    /* copy from:
    /* https://github.com/wjbryant/taboverride/blob/master/src/taboverride.js
    */

    // multi line selection
    if (selStart !== selEnd) {

      numTabs = 1; // for the first tab

      // insert tabs at the beginning of each line of the selection
      target.value = text.slice(0, startLine) + tab +
      text.slice(startLine, endLine).replace(/\n/g, function () {
          numTabs += 1;
          return '\n' + tab;
      }) + text.slice(endLine);
      // the selection start is always moved by 1 character
      target.selectionStart = selStart + tabLen;
      // move the selection end over by the total number of tabs inserted
      target.selectionEnd = selEnd + (numTabs * tabLen);
      target.scrollTop = initScrollTop;

    } else {
      target.value = text.slice(0, selStart) + tab + text.slice(selEnd);
      target.selectionEnd = target.selectionStart = selStart + tabLen;
      target.scrollTop = initScrollTop;
    }
  }

  function getSelectionEdges(text, selStart, selEnd) {
    // logic to select startLine 
    if (selStart === 0 || text.charAt(selStart - 1) === '\n') {
      startLine = selStart;
    } else {
      startLine = text.lastIndexOf('\n', selStart - 1) + 1;
    }

    // find the end of the last selected line
    if (selEnd === text.length || text.charAt(selEnd) === '\n') {
        endLine = selEnd;
    } else if (text.charAt(selEnd - 1) === '\n') {
        endLine = selEnd - 1;
    } else {
        endLine = text.indexOf('\n', selEnd);
        if (endLine === -1) {
            endLine = text.length;
        }
    }

    return [startLine, endLine]
  }


  function untabbing(target, sel, selStart, selEnd) {
    let tab = aTab,
        tabLen = tab.length,
        text = target.value,
        numTabs = 0,
        startTab = 0,
        preTab = 0,
        initScrollTop = target.scrollTop;;
    // if the character before the selection is a tab, remove it
        // multi line selection
    if (selStart !== selEnd) {
      let lineArr = getSelectionEdges(text, selStart, selEnd);
      startLine = lineArr[0];
      endLine = lineArr[1];
      if (text.slice(startLine).indexOf(tab) === 0) {
          // is this tab part of the selection?
          if (startLine === selStart) {
              // it is, remove it
              sel = sel.slice(tabLen);
          } else {
              // the tab comes before the selection
              preTab = tabLen;
          }
          startTab = tabLen;
      }

      target.value = text.slice(0, startLine) + text.slice(startLine + preTab, selStart) +
        sel.replace(new RegExp('\n' + tab, 'g'), function () {
            numTabs += 1;
            return '\n';
        }) + text.slice(selEnd);

        // set start first for Opera
      target.selectionStart = selStart - preTab; // preTab is 0 or tabLen
        // move the selection end over by the total number of tabs removed
      target.selectionEnd = selEnd - startTab - (numTabs * tabLen);
    } else {
      if (text.slice(selStart - tabLen).indexOf(tab) === 0) {
        target.value = text.slice(0, selStart - tabLen) + text.slice(selStart);
        target.selectionEnd = target.selectionStart = selStart - tabLen;
        target.scrollTop = initScrollTop;
      }
    }
  }


  return {
    handleKeyDown: handleKeyDown
  }
})();

module.exports = contentEditableHelper;