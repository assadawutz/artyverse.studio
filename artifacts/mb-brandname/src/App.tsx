import { Switch,Route,Router as WouterRouter } from "wouter";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShopProvider } from "@/context/ShopContext";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Home } from "@/pages/Home";
import { Listing } from "@/pages/Listing";
import { Detail } from "@/pages/Detail";
import { Preview } from "@/pages/Preview";
import { About,Checkout,Confirmation,StoreOverlays,Wishlist } from "@/pages/MarketplacePages";
import NotFound from "@/pages/not-found";

const queryClient=new QueryClient();
function Router(){return <div className="flex flex-col min-h-[100dvh]"><Navbar/><MobileMenu/><CartDrawer/><main className="flex-1"><Switch><Route path="/" component={Home}/><Route path="/collection/:category" component={Listing}/><Route path="/preview/:slug" component={Preview}/><Route path="/product/:slug" component={Detail}/><Route path="/wishlist" component={Wishlist}/><Route path="/about" component={About}/><Route path="/checkout" component={Checkout}/><Route path="/order-confirmation/:orderId" component={Confirmation}/><Route component={NotFound}/></Switch></main><Footer/><StoreOverlays/></div>}
function App(){return <QueryClientProvider client={queryClient}><ShopProvider><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/,"")}><Router/></WouterRouter><Toaster/></TooltipProvider></ShopProvider></QueryClientProvider>}
export default App;
