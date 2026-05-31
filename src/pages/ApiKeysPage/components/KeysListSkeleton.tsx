import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CARD_COUNT = 5;

export function KeysListSkeleton() {
  return (
    <SkeletonTheme baseColor="#1A1F27" highlightColor="#2A2F38">
      <ul className="flex md:hidden flex-col gap-3">
        {Array.from({ length: CARD_COUNT }).map((_, cardIndex) => (
          <li
            key={cardIndex}
            className="flex items-start justify-between gap-3 rounded-lg border border-line bg-bg-surface p-4 shadow-card"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <Skeleton width={130} height={16} />
                <Skeleton width={80} height={14} />
              </div>
              <div className="mt-2">
                <Skeleton width={180} height={12} />
              </div>
            </div>
            <Skeleton width={16} height={16} circle />
          </li>
        ))}
      </ul>
    </SkeletonTheme>
  );
}
