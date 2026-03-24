import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal } = useShop();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[100] w-full max-w-md bg-background shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Cart ({cart.length})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 bg-secondary rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-4">
                  <ShoppingBag className="w-12 h-12 opacity-20" />
                  <p>Your cart is currently empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-primary font-semibold underline underline-offset-4 hover:text-accent transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-24 bg-secondary flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium text-foreground">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                          {item.category}
                        </p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold">${item.price}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-border bg-secondary/30">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Subtotal</span>
                  <span className="text-xl font-bold font-serif">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  className="w-full bg-primary text-primary-foreground py-4 text-sm font-bold tracking-widest hover:bg-primary/90 transition-colors shadow-lg"
                  onClick={() => {
                    alert("Proceeding to checkout!");
                    setIsCartOpen(false);
                  }}
                >
                  CHECKOUT
                </button>
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
