const textSelections = [];
chrome.storage.local.get('chromeliter', (items) => {
  const itemsArr = JSON.parse(items.chromeliter);
  itemsArr.forEach(text => textSelections.push(text));
});

function addTextSelection() {
  const selObj = window.getSelection();
  if (selObj.isCollapsed) return;
  let selRange = selObj.getRangeAt(0);
  let result = selObj.toString();
  textSelections.push(result);
  chrome.storage.local.set({ chromeliter: JSON.stringify(textSelections) });
  chrome.storage.local.get('chromeliter', (items) => console.log(items));
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
