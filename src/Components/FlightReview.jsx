import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Plane,
  Shield,
  Sparkles,
} from "lucide-react";
const FlightReview = ({ selflight, onback }) => {
  const segments = selflight.itineraries[0].segments;
  const stopsCount = segments.length - 1;
  const price = Number(selflight.price);
  const hasLayover = stopsCount > 0;
  const formatTime = (dateStr) => {
    if (!dateStr) return "--:--";
    return new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  const getLayoverMinutes = (end, start) =>
    Math.round((new Date(start) - new Date(end)) / (1000 * 60));

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key="confirmation"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <button
            onClick={onback}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 transition-colors font-medium text-sm group bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to search results
          </button>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-100 font-medium">
                        Booking Confirmed
                      </p>
                      <h2 className="text-2xl font-bold">
                        {selflight.airline}
                      </h2>
                    </div>
                  </div>

                  <div className="text-right bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20">
                    <p className="text-sm text-blue-100 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold">${selflight.price}</p>
                  </div>
                </div>

                {/* Flight Route Overview */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-3xl font-bold mb-1">
                        {selflight.departureTime}
                      </p>
                      <p className="text-sm text-blue-100">
                        {selflight.origin}
                      </p>
                    </div>

                    <div className="flex-1 px-6 flex flex-col items-center">
                      <p className="text-xs font-semibold text-blue-100 mb-2">
                        {selflight.duration}
                      </p>
                      <div className="w-full relative">
                        <div className="h-0.5 bg-white/30"></div>
                        <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rotate-90" />
                      </div>
                      <p className="text-xs text-blue-100 mt-2">
                        {stopsCount === 0
                          ? "Direct"
                          : `${stopsCount} stop${stopsCount > 1 ? "s" : ""}`}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-3xl font-bold mb-1">
                        {selflight.arrivalTime}
                      </p>
                      <p className="text-sm text-blue-100">
                        {selflight.destination}
                      </p>
                    </div>
                  </div>
                </div>
                {hasLayover && (
                  <div className="bg-white border-t border-slate-200 px-6 py-6">
                    <h3 className="text-sm font-bold text-slate-700 mb-5">
                      Flight Timeline
                    </h3>

                    <div className="space-y-6">
                      {segments.map((seg, idx) => (
                        <div key={seg.id} className="relative pl-6">
                          {idx !== segments.length - 1 && (
                            <span className="absolute left-[6px] top-6 h-full w-px bg-slate-300" />
                          )}

                          <span className="absolute left-0 top-1.5 w-3 h-3 bg-blue-600 rounded-full" />

                          <div className="flex justify-between">
                            <div>
                              <p className="font-semibold text-slate-800">
                                {formatTime(seg.departure.at)} ·{" "}
                                {seg.departure.iataCode}
                              </p>
                              <p className="text-xs text-slate-500">
                                Terminal {seg.departure.terminal}
                              </p>
                            </div>
                            <p className="text-xs text-slate-600">
                              {seg.carrierCode} {seg.number}
                            </p>
                          </div>

                          <div className="mt-3">
                            <p className="font-semibold text-slate-800">
                              {formatTime(seg.arrival.at)} ·{" "}
                              {seg.arrival.iataCode}
                            </p>
                            <p className="text-xs text-slate-500">
                              Terminal {seg.arrival.terminal}
                            </p>
                          </div>

                          {/* Layover info */}
                          {idx !== segments.length - 1 && (
                            <div className="mt-4 ml-1 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
                              Layover at <b>{seg.arrival.iataCode}</b> ·{" "}
                              {getLayoverMinutes(
                                seg.arrival.at,
                                segments[idx + 1].departure.at,
                              )}{" "}
                              mins
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                  Fare Breakup
                </h3>

                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">
                        Base Fare
                      </span>
                      <span className="font-bold text-slate-800">
                        ${selflight.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">
                        Taxes & Fees
                      </span>
                      <span className="font-bold text-slate-800">
                        ${Math.round(price * 0.15)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-green-600">
                      <span className="font-medium">Instant Discount</span>
                      <span className="font-bold">- $5</span>
                    </div>

                    <div className="border-t-2 border-dashed border-slate-300 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-800">
                          Total Amount
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          ${Math.round(price * 1.15 - 50)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-bold text-green-900">
                    Free Cancellation
                  </p>
                  <p className="text-xs text-green-700 mt-1">Within 24 hours</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-bold text-blue-900">
                    Travel Insurance
                  </p>
                  <p className="text-xs text-blue-700 mt-1">Add for ₹99</p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-bold text-orange-900">
                    Earn Rewards
                  </p>
                  <p className="text-xs text-orange-700 mt-1">Get 200 points</p>
                </div>
              </div>
            </div>

            {/* Footer CTA -*/}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                  <span>Add More Details</span>
                </button>
                <button className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2">
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <p className="text-center text-xs text-slate-500 mt-4">
                🔒 Secure payment powered by 256-bit SSL encryption
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FlightReview;
