import React, { useState } from 'react';
import { X, Ruler, Check, HelpCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'standard' | 'robes' | 'shirts' | 'wigs'>('standard');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-[#0E0E10]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#D5CFBF] shadow-2xl z-10 max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#F5EFE3] flex items-center justify-center text-[#8C6D37]">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8C6D37]">
                ATELIER MEASUREMENT BENCHMARK
              </div>
              <h3 className="font-serif text-2xl text-[#0E0E10] font-normal">
                SIZE GUIDE
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#71717A] hover:text-[#0E0E10] transition-colors"
            aria-label="Close Size Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E5E0D8] mb-6 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('standard')}
            className={`pb-3 px-3 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'standard'
                ? 'border-[#0E0E10] text-[#0E0E10] font-semibold'
                : 'border-transparent text-[#71717A] hover:text-[#0E0E10]'
            }`}
          >
            Standard Sizes (S - XXL)
          </button>
          <button
            onClick={() => setActiveTab('robes')}
            className={`pb-3 px-3 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'robes'
                ? 'border-[#0E0E10] text-[#0E0E10] font-semibold'
                : 'border-transparent text-[#71717A] hover:text-[#0E0E10]'
            }`}
          >
            Court Robe Lengths
          </button>
          <button
            onClick={() => setActiveTab('shirts')}
            className={`pb-3 px-3 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'shirts'
                ? 'border-[#0E0E10] text-[#0E0E10] font-semibold'
                : 'border-transparent text-[#71717A] hover:text-[#0E0E10]'
            }`}
          >
            Court Shirts &amp; Collars
          </button>
          <button
            onClick={() => setActiveTab('wigs')}
            className={`pb-3 px-3 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'wigs'
                ? 'border-[#0E0E10] text-[#0E0E10] font-semibold'
                : 'border-transparent text-[#71717A] hover:text-[#0E0E10]'
            }`}
          >
            Barrister Wigs
          </button>
        </div>

        {/* Tab 1: Standard S - XXL Table */}
        {activeTab === 'standard' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0E0E10] font-bold">
                Standard Apparel Measurement Matrix
              </span>
              <span className="text-[11px] text-[#71717A] font-mono">Inches &amp; Centimeters</span>
            </div>

            <p className="text-xs text-[#52525B] leading-relaxed">
              Use this benchmark table for standard courtroom apparel, suits, jackets, and tunic garments. For traditional advocate robes, finished length is measured from nape of neck to calf.
            </p>

            <div className="overflow-x-auto border border-[#E5E0D8] bg-white">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F2EFE9] font-mono text-[11px] uppercase tracking-wider text-[#0E0E10]">
                  <tr>
                    <th className="p-3 border-b border-[#E5E0D8]">Size</th>
                    <th className="p-3 border-b border-[#E5E0D8]">Chest</th>
                    <th className="p-3 border-b border-[#E5E0D8]">Length</th>
                    <th className="p-3 border-b border-[#E5E0D8]">Shoulder Width</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D8] font-mono text-xs">
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">S</td>
                    <td className="p-3 text-[#52525B]">36&quot; - 38&quot; (91 - 96 cm)</td>
                    <td className="p-3 text-[#52525B]">48&quot; (122 cm)</td>
                    <td className="p-3 text-[#71717A]">17.5&quot; (44 cm)</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">M</td>
                    <td className="p-3 text-[#52525B]">38&quot; - 40&quot; (96 - 101 cm)</td>
                    <td className="p-3 text-[#52525B]">50&quot; (127 cm)</td>
                    <td className="p-3 text-[#71717A]">18.0&quot; (46 cm)</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">L</td>
                    <td className="p-3 text-[#52525B]">40&quot; - 42&quot; (101 - 107 cm)</td>
                    <td className="p-3 text-[#52525B]">52&quot; (132 cm)</td>
                    <td className="p-3 text-[#71717A]">18.5&quot; (47 cm)</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">XL</td>
                    <td className="p-3 text-[#52525B]">42&quot; - 44&quot; (107 - 112 cm)</td>
                    <td className="p-3 text-[#52525B]">54&quot; (137 cm)</td>
                    <td className="p-3 text-[#71717A]">19.5&quot; (49 cm)</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">XXL</td>
                    <td className="p-3 text-[#52525B]">44&quot; - 48&quot; (112 - 122 cm)</td>
                    <td className="p-3 text-[#52525B]">56&quot; (142 cm)</td>
                    <td className="p-3 text-[#71717A]">20.5&quot; (52 cm)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Court Robes Table */}
        {activeTab === 'robes' && (
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0E0E10] font-bold block">
              Advocate Court Robes — Height &amp; Length Guide
            </span>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Judicial robes are designed to finish approximately 8 to 10 inches above floor level, allowing clean movement when standing at the bar or bowing before the bench.
            </p>
            <div className="overflow-x-auto border border-[#E5E0D8] bg-white">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F2EFE9] font-mono text-[11px] uppercase tracking-wider text-[#0E0E10]">
                  <tr>
                    <th className="p-3 border-b border-[#E5E0D8]">Robe Size</th>
                    <th className="p-3 border-b border-[#E5E0D8]">Advocate Height</th>
                    <th className="p-3 border-b border-[#E5E0D8]">Finished Robe Length</th>
                    <th className="p-3 border-b border-[#E5E0D8]">Recommended Chest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D8] font-mono text-xs">
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">38R (50&quot;)</td>
                    <td className="p-3">5&apos;3&quot; - 5&apos;6&quot; (160 - 168 cm)</td>
                    <td className="p-3">50 inches (127 cm)</td>
                    <td className="p-3 text-[#71717A]">36&quot; - 38&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">40R (52&quot;)</td>
                    <td className="p-3">5&apos;7&quot; - 5&apos;9&quot; (170 - 175 cm)</td>
                    <td className="p-3">52 inches (132 cm)</td>
                    <td className="p-3 text-[#71717A]">38&quot; - 40&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">42R (54&quot;)</td>
                    <td className="p-3">5&apos;10&quot; - 6&apos;0&quot; (178 - 183 cm)</td>
                    <td className="p-3">54 inches (137 cm)</td>
                    <td className="p-3 text-[#71717A]">40&quot; - 42&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">44R (56&quot;)</td>
                    <td className="p-3">6&apos;1&quot; - 6&apos;3&quot; (185 - 190 cm)</td>
                    <td className="p-3">56 inches (142 cm)</td>
                    <td className="p-3 text-[#71717A]">42&quot; - 44&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">46R (58&quot;)</td>
                    <td className="p-3">6&apos;4&quot;+ (192 cm+)</td>
                    <td className="p-3">58 inches (147 cm)</td>
                    <td className="p-3 text-[#71717A]">44&quot; - 48&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5] bg-[#F5EFE3]/40">
                    <td className="p-3 font-semibold text-[#8C6D37]">Bespoke Custom</td>
                    <td className="p-3 text-[#8C6D37]" colSpan={3}>
                      Custom measurements taken at our atelier (668C+QRQ Palestina, Shekilango Rd, Dar es Salaam).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Shirts & Collars */}
        {activeTab === 'shirts' && (
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0E0E10] font-bold block">
              Court Tunic Shirts &amp; Detachable Wing Collars
            </span>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Measure around the base of the neck where the shirt collar band fastens with collar studs. Add half an inch for natural breathing room.
            </p>
            <div className="overflow-x-auto border border-[#E5E0D8] bg-white">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F2EFE9] font-mono text-[11px] uppercase tracking-wider text-[#0E0E10]">
                  <tr>
                    <th className="p-3 border-b border-[#E5E0D8]">Collar Size</th>
                    <th className="p-3 border-b border-[#E5E0D8]">Exact Neck Measure</th>
                    <th className="p-3 border-b border-[#E5E0D8]">Sleeve Length</th>
                    <th className="p-3 border-b border-[#E5E0D8]">Chest Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D8] font-mono text-xs">
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">15.0&quot; (38 cm)</td>
                    <td className="p-3">14.5&quot; - 15.0&quot;</td>
                    <td className="p-3">33.5&quot;</td>
                    <td className="p-3 text-[#71717A]">36&quot; - 38&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">15.5&quot; (39 cm)</td>
                    <td className="p-3">15.0&quot; - 15.5&quot;</td>
                    <td className="p-3">34.0&quot;</td>
                    <td className="p-3 text-[#71717A]">38&quot; - 40&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">16.0&quot; (41 cm)</td>
                    <td className="p-3">15.5&quot; - 16.0&quot;</td>
                    <td className="p-3">34.5&quot;</td>
                    <td className="p-3 text-[#71717A]">40&quot; - 42&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">16.5&quot; (42 cm)</td>
                    <td className="p-3">16.0&quot; - 16.5&quot;</td>
                    <td className="p-3">35.0&quot;</td>
                    <td className="p-3 text-[#71717A]">42&quot; - 44&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">17.0&quot; (43 cm)</td>
                    <td className="p-3">16.5&quot; - 17.0&quot;</td>
                    <td className="p-3">35.5&quot;</td>
                    <td className="p-3 text-[#71717A]">44&quot; - 46&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">17.5&quot; (44.5 cm)</td>
                    <td className="p-3">17.0&quot; - 17.5&quot;</td>
                    <td className="p-3">36.0&quot;</td>
                    <td className="p-3 text-[#71717A]">46&quot; - 48&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Wigs */}
        {activeTab === 'wigs' && (
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0E0E10] font-bold block">
              Ceremonial Horsehair Judicial Wigs
            </span>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Measure head circumference directly above the eyebrows and ears using a flexible tailor&apos;s tape. Barrister wigs feature internal adjusters for stability.
            </p>
            <div className="overflow-x-auto border border-[#E5E0D8] bg-white">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F2EFE9] font-mono text-[11px] uppercase tracking-wider text-[#0E0E10]">
                  <tr>
                    <th className="p-3 border-b border-[#E5E0D8]">Wig Size (cm)</th>
                    <th className="p-3 border-b border-[#E5E0D8]">Hat Size (UK/US)</th>
                    <th className="p-3 border-b border-[#E5E0D8]">Head Circumference (Inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D8] font-mono text-xs">
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">55 cm</td>
                    <td className="p-3">6 3/4</td>
                    <td className="p-3">21.5&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">56 cm</td>
                    <td className="p-3">6 7/8</td>
                    <td className="p-3">22.0&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">57 cm</td>
                    <td className="p-3">7</td>
                    <td className="p-3">22.4&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">58 cm</td>
                    <td className="p-3">7 1/8</td>
                    <td className="p-3">22.8&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">59 cm</td>
                    <td className="p-3">7 1/4</td>
                    <td className="p-3">23.2&quot;</td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5]">
                    <td className="p-3 font-semibold text-[#0E0E10]">60 cm</td>
                    <td className="p-3">7 3/8</td>
                    <td className="p-3">23.6&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Chambers Assistance Note */}
        <div className="mt-6 p-4 bg-[#F2EFE9] border border-[#E5E0D8] flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-[#8C6D37] shrink-0 mt-0.5" />
          <div className="text-xs text-[#52525B] leading-relaxed">
            <span className="font-semibold text-[#0E0E10] block mb-0.5">Need bespoke measurements or personal chamber fitting?</span>
            Visit our Dar es Salaam atelier at 668C+QRQ Palestina, Shekilango Rd, Dar es Salaam, Tanzania or message us on WhatsApp at <strong>+255 687 262 017</strong> for tailoring guidance.
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-[#E5E0D8] text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-[#0E0E10] hover:bg-[#252528] text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm"
          >
            CLOSE SIZE GUIDE
          </button>
        </div>
      </div>
    </div>
  );
};
