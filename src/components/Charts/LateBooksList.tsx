import { useLibraryStore } from "../../store/useLibraryStore";
import { AlertCircle, User, BookMarked, Clock } from "lucide-react";
import { formatNumber, maskNimWithFaculty } from "../../utils/formatters";
import type { LateBook } from "../../types";

export function LateBooksList({ isActive = true }: { isActive?: boolean }) {
  const stats = useLibraryStore((s) => s.stats);

  const lateBooksCount = stats.late_books?.length || 0;
  const shouldScroll = lateBooksCount > 3;
  // 3.5 seconds per item for a comfortable reading speed
  const scrollDuration = Math.max(15, lateBooksCount * 3.5);

  const renderBookItem = (book: LateBook, uniqueKey: string) => (
    <div
      key={uniqueKey}
      className="min-h-[90px] flex flex-col justify-center bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-3 shrink-0"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        {book.photo ? (
          <img
            src={book.photo}
            alt={book.memberName}
            className="w-16 h-16 rounded-xl object-cover shadow-sm shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-300 to-red-500 flex items-center justify-center flex-shrink-0 shadow-sm">
            <User className="h-8 w-8 text-white" />
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Name, NIM, and Faculty */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex flex-col min-w-0">
              <p className="font-bold text-lg text-gray-900 truncate leading-tight">
                {book.memberName}
              </p>
              <p className="text-xs text-gray-500 truncate mt-0.5 font-medium">
                NIM: {maskNimWithFaculty(book.nim, book.faculty)}
              </p>
            </div>
          </div>

          {/* Book Title */}
          <div className="flex items-center gap-2 mb-2">
            <BookMarked className="h-4 w-4 text-red-600 shrink-0" />
            <p className="text-base text-gray-800 line-clamp-1 font-medium">
              {book.title}
            </p>
          </div>

          {/* Late days and Fine */}
          <div className="flex items-center justify-between gap-2 mt-auto">
            <div className="flex items-center gap-1.5 text-red-600">
              <Clock className="h-4 w-4" />
              <span className="text-base font-bold">
                {book.daysLate} hari
              </span>
            </div>
            <span className="text-lg font-black text-red-700 bg-red-200/50 px-2.5 py-0.5 rounded-lg border border-red-200">
              Rp {formatNumber(book.fine)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="kpi-card flex flex-col animate-fade-in overflow-hidden h-full">
      <div className="kpi-card-header shrink-0 z-10 bg-white shadow-sm">
        <div className="h-6 w-1.5 rounded-full bg-red-500" />
        <AlertCircle className="h-5 w-5 text-red-600" strokeWidth={2.2} />
        <span className="kpi-title text-red-700 tracking-wider">
          KETERLAMBATAN BUKU
        </span>
        <span className="ml-auto text-red-600 font-bold text-sm">
          {stats.overdue_books}
        </span>
      </div>

      {/* Content with seamless continuous scrolling */}
      <div className="flex-1 overflow-hidden relative min-h-0 bg-white">
        {stats.late_books && stats.late_books.length > 0 ? (
          <div 
            className={`absolute top-0 left-0 w-full flex flex-col ${
              shouldScroll 
                ? "animate-marquee-vertical hover:[animation-play-state:paused]" 
                : ""
            }`}
            style={{ 
              animationDuration: shouldScroll ? `${scrollDuration}s` : undefined,
              animationPlayState: shouldScroll ? (isActive ? "running" : "paused") : undefined
            }}
          >
            {/* Block 1 */}
            <div className="flex flex-col gap-2 pb-2 px-2 pt-2">
              {stats.late_books.map((book) => renderBookItem(book, `block1-${book.id}`))}
            </div>
            {/* Block 2 (duplicate for seamless loop, only render if scrolling) */}
            {shouldScroll && (
              <div className="flex flex-col gap-2 pb-2 px-2">
                {stats.late_books.map((book) => renderBookItem(book, `block2-${book.id}`))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <AlertCircle className="h-7 w-7 text-green-600" />
            </div>
            <p className="text-base font-semibold text-gray-700">
              Tidak Ada Keterlambatan
            </p>
          </div>
        )}
      </div>

      <div className="h-1 bg-gradient-to-r from-red-200 via-red-400 to-red-200 shrink-0 z-10" />
    </div>
  );
}
