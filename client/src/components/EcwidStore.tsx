import { useEffect } from "react";

declare global {
  interface Window {
    xProductBrowser: (...args: string[]) => void;
    Ecwid: any;
    ecwid_script_defer: boolean;
    ecwid_dynamic_widgets: boolean;
    _xnext_initialization_scripts: any[];
  }
}

const STORE_ID = "128774264";

interface EcwidStoreProps {
  defaultCategoryId?: number;
  defaultProductId?: number;
}

export function EcwidStore({ defaultCategoryId, defaultProductId }: EcwidStoreProps) {
  useEffect(() => {
    const containerId = `my-store-${STORE_ID}`;
    
    const initProductBrowser = () => {
      if (!window.xProductBrowser) return;
      
      const params = [
        "categoriesPerRow=3",
        "views=grid(20,3) list(60) table(60)",
        "categoryView=grid",
        "searchView=list",
        `id=${containerId}`,
      ];

      if (defaultCategoryId) {
        params.push(`defaultCategoryId=${defaultCategoryId}`);
      }
      if (defaultProductId) {
        params.push(`defaultProductId=${defaultProductId}`);
      }

      window.xProductBrowser(...params);
    };

    const loadEcwidScript = () => {
      if (document.getElementById("ecwid-script")) {
        if (window.Ecwid && window.Ecwid.OnAPILoaded) {
          window.Ecwid.OnAPILoaded.add(initProductBrowser);
        } else {
          setTimeout(loadEcwidScript, 100);
        }
        return;
      }

      window.ecwid_script_defer = true;
      window.ecwid_dynamic_widgets = true;

      const script = document.createElement("script");
      script.id = "ecwid-script";
      script.type = "text/javascript";
      script.src = `https://app.ecwid.com/script.js?${STORE_ID}&data_platform=code`;
      script.charset = "utf-8";
      script.async = true;

      script.onload = () => {
        if (window.Ecwid && window.Ecwid.OnAPILoaded) {
          window.Ecwid.OnAPILoaded.add(initProductBrowser);
        }
      };

      document.body.appendChild(script);
    };

    loadEcwidScript();
  }, [defaultCategoryId, defaultProductId]);

  return (
    <div className="w-full min-h-[600px]">
      <div id={`my-store-${STORE_ID}`} data-testid="ecwid-store"></div>
    </div>
  );
}

export function EcwidCartWidget() {
  return (
    <div 
      className="ec-cart-widget" 
      data-testid="ecwid-cart-widget"
    ></div>
  );
}

export function EcwidAccountWidget() {
  return (
    <div 
      className="ec-minicart" 
      data-testid="ecwid-account-widget"
    ></div>
  );
}

export function initEcwidScript() {
  if (document.getElementById("ecwid-script")) {
    return;
  }

  window.ecwid_script_defer = true;
  window.ecwid_dynamic_widgets = true;

  const script = document.createElement("script");
  script.id = "ecwid-script";
  script.type = "text/javascript";
  script.src = `https://app.ecwid.com/script.js?${STORE_ID}&data_platform=code`;
  script.charset = "utf-8";
  script.async = true;

  document.body.appendChild(script);
}

export default EcwidStore;
