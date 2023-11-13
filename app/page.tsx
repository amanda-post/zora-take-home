'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ColorId, OrderBy, SearchOrderBy } from 'unsplash-js';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { colorOptions, getPhotos } from '~/app/actions';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';

// TODO: Add tests, fix pagination buttons, update styles

export default function Home() {
  const [color, setColor] = useState<ColorId | 'none'>('none');
  const [orderBy, setOrderBy] = useState<SearchOrderBy>(OrderBy.LATEST);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [photos, setPhotos] = useState<Basic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleColorChange = (colorId: string) => {
    setColor(colorId === 'none' ? 'none' : (colorId as ColorId));
  };

  const handleSearchSubmit = () => {
    setIsLoading(true);

    const searchInput = {
      query: searchQuery,
      orderBy,
      page,
      ...(color !== 'none' && { color }),
    };

    getPhotos(searchInput)
      .then(({ response }) => {
        setPhotos(response?.results || []);
        setTotalPages(response?.total_pages || 0);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      });
  };

  const handleEnterKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    searchQuery && handleSearchSubmit();
  }, [orderBy, color, page]);

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='flex mb-6'>
        Search photos:
        <Input
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onKeyDown={handleEnterKeydown}
          className='mx-4'
        />
        <Button onClick={handleSearchSubmit}>Search</Button>
      </div>
      <div className='mb-6'>
        Filter by color:
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='mx-4'>
              {color ? colorOptions[color] : 'None'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.entries(colorOptions).map(([colorId, displayName]) => (
              <DropdownMenuItem
                key='color'
                onSelect={() => handleColorChange(colorId)}
              >
                {displayName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        Sort by:
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='mx-4'>
              {orderBy.charAt(0).toUpperCase() + orderBy.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              key='latest'
              onSelect={() => setOrderBy('latest')}
            >
              Latest
            </DropdownMenuItem>
            <DropdownMenuItem
              key='relevant'
              onSelect={() => setOrderBy('relevant')}
            >
              Most Relevant
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isLoading ? (
        <div className='py-20'>Loading...</div>
      ) : !!photos.length ? (
        photos.map(({ id, urls, alt_description }) => (
          <div className='relative aspect-square w-1/3 mb-4' key={id}>
            <Image
              src={urls.small}
              alt={alt_description || ''}
              className='object-cover'
              quality={100}
              fill
            />
          </div>
        ))
      ) : (
        <div>No images to see here!</div>
      )}
      <div className='flex flex-wrap'>
        {pages.map((page) => (
          <Button key={page} onClick={() => setPage(page)}>
            {page}
          </Button>
        ))}
      </div>
    </main>
  );
}
