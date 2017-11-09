const textSelections = [];

function addTextSelection() {
  const selObj = window.getSelection();
  if (selObj.isCollapsed) return;
  let selRange = selObj.getRangeAt(0);
  let result = selObj.toString();
  textSelections.push(result);
};

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message.type === 'addTextSelection') {
      addTextSelection();
    };
    console.log('Sending response:', formatTextSelections());
    sendResponse(formatTextSelections());
  }
);

function formatTextSelections() {
  const listItems = textSelections.map((text) => {
    return `<li>${text}</li>`;
  });
  return `<ul>${listItems.join('')}</ul>`;
}
