import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ROW_COUNT = 6;
const COLUMNS = ['Name', 'API key', 'Status', 'Expires', 'Created', 'Last used'];

export function KeysTableSkeleton() {
  return (
    <SkeletonTheme baseColor="#1A1F27" highlightColor="#2A2F38">
      <div className="hidden md:block overflow-x-auto rounded-lg border border-line bg-bg-surface shadow-card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-line text-left text-sm text-ink-secondary">
              {COLUMNS.map((column) => (
                <th key={column} className="px-4 py-3 font-normal">
                  {column}
                </th>
              ))}
              <th className="px-4 py-3" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROW_COUNT }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-line">
                <td className="px-4 py-3"><Skeleton width={140} /></td>
                <td className="px-4 py-3"><Skeleton width={110} /></td>
                <td className="px-4 py-3"><Skeleton width={60} height={22} borderRadius={999} /></td>
                <td className="px-4 py-3"><Skeleton width={80} /></td>
                <td className="px-4 py-3"><Skeleton width={90} /></td>
                <td className="px-4 py-3"><Skeleton width={100} /></td>
                <td className="px-4 py-3 text-right"><Skeleton width={16} height={16} circle /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SkeletonTheme>
  );
}
