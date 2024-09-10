import { IconX } from '@tabler/icons-react';
import { FC } from 'react';

import { useTranslation } from 'next-i18next';
import { getSettings } from '@/utils/app/settings';
interface Props {
  placeholder: string;
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}
const Search: FC<Props> = ({ placeholder, searchTerm, onSearch }) => {
  const { t } = useTranslation('sidebar');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    onSearch('');
  };

  return (
    <div className={`relative flex items-center ${getSettings().theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <input
        className={`w-full flex-1 rounded-md border border-neutral-600  ${getSettings().theme === 'dark' ? 'bg-[#202123]' : 'bg-[#FAFAFA]'} px-4 py-3 pr-10 text-[14px] leading-3`}
        type="text"
        placeholder={t(placeholder) || ''}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {searchTerm && (
        <IconX
          className="absolute right-4 cursor-pointer text-neutral-300 hover:text-neutral-400"
          size={18}
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

export default Search;
