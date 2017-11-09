let result;
document.body.addEventListener('mouseup', () => {
  const selObj = window.getSelection();
  let selRange = selObj.getRangeAt(0);
  // console.dir(selObj, selRange);
  // console.log(selObj.toString());
  // const highlight = document.createElement('span');
  // highlight.style.backgroundColor = 'yellow';
  // selRange.surroundContents(highlight);
  let result = selObj.toString();
  console.log(result);
  chrome.runtime.sendMessage({ from: 'content', subject: 'Text' }, (response) => console.log(response));
});
