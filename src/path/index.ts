/**
 * Store ranges using XPaths.
 */
export const calculateXPath = function (node: Node): string {
  const parts: string[] = [];
  let current: Node | null = node;

  while (current) {
    if (
      current.nodeType === Node.ELEMENT_NODE ||
      current.nodeType === Node.TEXT_NODE
    ) {
      if (current.nodeType === Node.ELEMENT_NODE) {
        const element = current as Element;
        let part = element.nodeName.toLowerCase();

        const id = element.getAttribute("id");
        const classNames = element.getAttribute("class");
        const dataAttr = Array.from(element.attributes).find((attr) =>
          attr.name.startsWith("data-")
        );

        if (id) {
          part += `[@id="${id}"]`;
        } else if (classNames) {
          part += `[contains(@class, "${classNames
            .trim()
            .replace(/\s+/g, " ")}")]`;
        } else if (dataAttr) {
          part += `[@${dataAttr.name}="${dataAttr.value}"]`;
        } else {
          let index = 1;
          let sibling = current.previousSibling;

          while (sibling) {
            if (
              sibling.nodeType === Node.ELEMENT_NODE &&
              sibling.nodeName === element.nodeName
            ) {
              index++;
            }
            sibling = sibling.previousSibling;
          }

          if (index > 1) {
            part += `[${index}]`;
          }
        }

        parts.unshift(part);
      } else if (current.nodeType === Node.TEXT_NODE) {
        const parentXPath: string | null = calculateXPath(current.parentNode!);

        const nodeIndex =
          Array.from(current.parentNode!.childNodes)
            .filter((node) => node.nodeName === "#text")
            .indexOf(node as ChildNode) + 1;

        return `${parentXPath}/text()[${nodeIndex}]`;
      }
    }

    // Move to the parent node
    current = current.parentNode;
  }

  return parts.length ? "/" + parts.join("/") : "";
};

export const getNodeByXPath = function (xpath: string) {
  const result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ANY_TYPE,
    null
  );

  if (result.resultType === XPathResult.STRING_TYPE) {
    console.log("String Value:", result.stringValue);
  } else if (result.resultType === XPathResult.NUMBER_TYPE) {
    console.log("Number Value:", result.numberValue);
  } else if (result.resultType === XPathResult.BOOLEAN_TYPE) {
    console.log("Boolean Value:", result.booleanValue);
  } else if (result.resultType === XPathResult.UNORDERED_NODE_ITERATOR_TYPE) {
    console.log("UNORDERED_NODE_ITERATOR_TYPE");
    let node = result.iterateNext();
    if (node) {
      console.log("Node Value:", node.nodeValue);
      return node;
    } else {
      console.log("No matching node found.");
    }
  } else if (result.resultType === XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
    let node = result.iterateNext();

    if (node) {
      console.log("Node Value:", node.nodeValue);
      return node;
    } else {
      console.log("No matching node found.");
    }
  } else {
    console.log("Invalid Result Type:", result.resultType);
    return null;
  }
};
