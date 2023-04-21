import { useEffect } from "react";

function DocumentTitle({ pageTitle }) {
  useEffect(() => {
    document.title = `MYSHOPPING - ${pageTitle}`;
  }, [pageTitle]);

  return (
    <>
     
    </>
  );
}

export default DocumentTitle