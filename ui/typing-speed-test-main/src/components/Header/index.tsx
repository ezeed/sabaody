import LogoLarge from '../../../assets/images/logo-large.svg?react';
import LogoSmall from '../../../assets/images/logo-small.svg?react';
import PersonalBest from '../../../assets/images/icon-personal-best.svg?react';

export const Header = ({ record }: { record?: number }) => {
  return (
    <header className="flex justify-between p-4 sm:px-45 sm:pt-10 sm:pb-15">
      <LogoLarge className="hidden sm:block" />
      <LogoSmall className="sm:hidden" />
      <div className="flex items-center gap-2 text-neutral-400">
        <PersonalBest width={20} />
        <span className="hidden sm:block">Personal</span>
        best:
        {record ? (
          <span className="text-neutral-100">{record} WPM</span>
        ) : (
          <span className="text-neutral-100">No stats</span>
        )}
      </div>
    </header>
  );
};
