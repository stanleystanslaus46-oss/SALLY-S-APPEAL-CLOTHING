import React, { useState, useEffect } from 'react';
import { X, User, ShieldCheck, Mail, Lock, Truck, Package, ChevronRight } from 'lucide-react';
import { OrderTrackingView } from './OrderTrackingView';
import { getStoredOrders, SAMPLE_ORDERS } from '../data/sampleOrders';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'account' | 'tracking';
  initialOrderNumber?: string;
  currency?: 'TZS' | 'USD';
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'account',
  initialOrderNumber = '',
  currency = 'TZS'
}) => {
  const [activeTab, setActiveTab] = useState<'account' | 'tracking'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [selectedOrderToTrack, setSelectedOrderToTrack] = useState<string>(initialOrderNumber);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      if (initialOrderNumber) {
        setSelectedOrderToTrack(initialOrderNumber);
      }
    }
  }, [isOpen, initialTab, initialOrderNumber]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSignedIn(true);
    }
  };

  const storedOrders = getStoredOrders();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-[#0E0E10]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${
          activeTab === 'tracking' ? 'max-w-2xl' : 'max-w-md'
        } max-h-[90vh] flex flex-col bg-[#FAF8F5] border border-[#D5CFBF] shadow-2xl z-10 transition-all duration-300`}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E0D8] bg-white shrink-0">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('account')}
              className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider pb-1 transition-colors border-b-2 ${
                activeTab === 'account'
                  ? 'border-[#0E0E10] text-[#0E0E10] font-bold'
                  : 'border-transparent text-[#71717A] hover:text-[#0E0E10]'
              }`}
            >
              <User className="w-4 h-4 text-[#8C6D37]" />
              <span>Counsel Account</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tracking')}
              className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider pb-1 transition-colors border-b-2 ${
                activeTab === 'tracking'
                  ? 'border-[#0E0E10] text-[#0E0E10] font-bold'
                  : 'border-transparent text-[#71717A] hover:text-[#0E0E10]'
              }`}
            >
              <Truck className="w-4 h-4 text-[#8C6D37]" />
              <span>Track Consignment</span>
              {storedOrders.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#3A724B]" />
              )}
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#71717A] hover:text-[#0E0E10] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {activeTab === 'tracking' ? (
            <OrderTrackingView
              initialOrderNumber={selectedOrderToTrack}
              currency={currency}
            />
          ) : (
            <>
              {signedIn ? (
                <div className="text-center py-4 space-y-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-[#EBF7EE] text-[#3A724B] rounded-full mx-auto">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-[#0E0E10]">Welcome, Counsel</h4>
                    <p className="text-xs text-[#52525B] mt-1">
                      Authenticated Advocate profile: <span className="font-mono font-semibold text-[#0E0E10]">{email}</span>
                    </p>
                    <p className="text-[11px] text-[#71717A] mt-1">
                      Your chambers sizing archive and High Court admittance records are synchronized.
                    </p>
                  </div>

                  {/* Orders quick lookup */}
                  <div className="bg-white border border-[#D5CFBF] p-4 text-left space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#0E0E10]">
                      <span className="flex items-center gap-1.5">
                        <Package className="w-4 h-4 text-[#8C6D37]" />
                        <span>Recent Chambers Consignments</span>
                      </span>
                      <button
                        onClick={() => setActiveTab('tracking')}
                        className="text-[#8C6D37] hover:underline flex items-center gap-1"
                      >
                        Track All <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="divide-y divide-[#E5E0D8] text-xs">
                      {(storedOrders.length > 0 ? storedOrders : SAMPLE_ORDERS).slice(0, 3).map((ord) => (
                        <div key={ord.orderNumber} className="py-2.5 flex items-center justify-between">
                          <div>
                            <div className="font-mono font-bold text-[#0E0E10]">{ord.orderNumber}</div>
                            <div className="text-[11px] text-[#71717A]">{ord.items[0]?.product.name || 'Legal Regalia'}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedOrderToTrack(ord.orderNumber);
                              setActiveTab('tracking');
                            }}
                            className="px-2.5 py-1 bg-[#FAF8F5] border border-[#D5CFBF] hover:border-[#0E0E10] font-mono text-[10px] uppercase font-semibold text-[#0E0E10]"
                          >
                            Track
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setActiveTab('tracking')}
                      className="px-5 py-2.5 bg-[#0E0E10] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#252528] transition-colors"
                    >
                      Track Active Orders
                    </button>
                    <button
                      onClick={() => {
                        setSignedIn(false);
                      }}
                      className="px-5 py-2.5 border border-[#D5CFBF] text-[#71717A] hover:text-[#0E0E10] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <h4 className="font-serif text-xl text-[#0E0E10] mb-1">Counsel Chambers Profile</h4>
                    <p className="text-xs text-[#71717A] mb-4">
                      Sign in with your legal chambers credentials to access saved measurements and court orders.
                    </p>
                  </div>

                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[#1C1C1C] mb-1">
                      Advocate / Judicial Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                      <input
                        type="email"
                        required
                        placeholder="counsel@chambers.co.tz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D5CFBF] focus:outline-hidden focus:border-[#0E0E10]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[#1C1C1C] mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D5CFBF] focus:outline-hidden focus:border-[#0E0E10]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0E0E10] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#252528] transition-colors"
                    >
                      SIGN IN TO CHAMBERS PROFILE
                    </button>
                  </div>

                  <div className="pt-3 border-t border-[#E5E0D8] flex items-center justify-between text-[11px] text-[#71717A]">
                    <span>Need to check consignment progress?</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('tracking')}
                      className="font-semibold text-[#0E0E10] hover:underline flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#8C6D37]" />
                      Track Consignment
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

