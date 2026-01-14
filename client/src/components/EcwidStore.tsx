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

function renderSignInLink() {
  const signinContainer = document.getElementById('ecwid-signin-link');
  if (!signinContainer || !window.Ecwid) return;
  
  // Clear existing content
  signinContainer.innerHTML = '';
  
  // Check if user is logged in
  window.Ecwid.OnAPILoaded.add(() => {
    const updateSignInUI = () => {
      if (!signinContainer) return;
      
      const link = document.createElement('a');
      link.href = '#';
      link.className = 'text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer';
      link.style.cssText = 'white-space: nowrap;';
      
      // Check customer logged in status
      if (window.Ecwid.getCustomer && window.Ecwid.getCustomer()) {
        link.textContent = 'My Account';
        link.onclick = (e) => {
          e.preventDefault();
          window.Ecwid.openPage('account');
        };
      } else {
        link.textContent = 'Sign In';
        link.onclick = (e) => {
          e.preventDefault();
          window.Ecwid.openPage('signin');
        };
      }
      
      signinContainer.innerHTML = '';
      signinContainer.appendChild(link);
    };
    
    updateSignInUI();
    
    // Update UI when customer signs in or out
    if (window.Ecwid.OnCartChanged) {
      window.Ecwid.OnCartChanged.add(updateSignInUI);
    }
  });
}

export function initEcwidScript() {
  const initWidgets = () => {
    if (window.Ecwid && typeof window.Ecwid.init === 'function') {
      window.Ecwid.init();
    }
    renderSignInLink();
  };

  if (document.getElementById("ecwid-script")) {
    // If script already exists, wait for API and initialize
    if (window.Ecwid && window.Ecwid.OnAPILoaded) {
      window.Ecwid.OnAPILoaded.add(initWidgets);
    } else if (window.Ecwid) {
      initWidgets();
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
      window.Ecwid.OnAPILoaded.add(initWidgets);
    }
  };

  document.body.appendChild(script);
}

export default EcwidStore;
