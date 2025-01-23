'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IconType } from 'react-icons/lib'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MdOutlineArrowDropDown } from 'react-icons/md'
import { cn } from '@/lib/utils'

export function DropdownMenuComponent({
  MenuIcon,
  menuData,
  titleClassName,
  initialTitle
}: {
  MenuIcon?: IconType
  menuData: { name: string; path: string; icon?: IconType }[]
  titleClassName?: string
  initialTitle?: string
}) {
  const path = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathes = menuData.map(item => item.path)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isSelectedPath = menuData.map(item => item.path).includes(path)

  return (
    <div ref={menuRef}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          onClick={() => setIsOpen(!isOpen)}
          asChild
          className={'border-b-2 border-accent_green px-3 text-accent_green'}
        >
          {/*<Button variant='default' className='icon'>*/}
          {/*  {IconMenu && <IconMenu className={'h-5 w-5'} />}*/}
          {/*  {title && <span className={'h2'}>{title}</span>}*/}
          {/*</Button>*/}

          <div className={'flex items-center justify-center text-white'}>
            <div
            // className='h-6 w-6 border-b-2 border-accent_green bg-accent_green text-accent_green'
            >
              {MenuIcon ? (
                <MenuIcon
                  className={cn(
                    titleClassName,
                    'mt-2 bg-transparent bg-clip-text text-3xl text-transparent text-white hover:border-none'
                  )}
                />
              ) : (
                <DropdownMenuLabel
                  className={cn(
                    'flex items-center text-white',
                    isSelectedPath
                      ? 'border-b-2 border-accent_green px-2 text-accent_green'
                      : ''
                  )}
                >
                  <p
                    className={cn(
                      // isSelectedPath &&
                      //   'border-b-2 border-accent_green px-2 text-accent_green',
                      titleClassName ||
                        'font-light capitalize transition-all hover:no-underline'
                    )}
                  >
                    {pathes.includes(path)
                      ? path
                      : initialTitle || pathes[0].slice(1)}
                  </p>
                  <MdOutlineArrowDropDown
                    className={cn(
                      // isSelectedPath &&
                      //   'border-b-2 border-accent_green px-2 text-accent_green',
                      'h-6 w-6 text-white'
                    )}
                  />
                </DropdownMenuLabel>
              )}
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          asChild
          className={'z-50 h-full w-full space-y-1'}
          align={'end'}
        >
          {/*<ul className='z-90 grid gap-3 absolute px-5 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] md:w-[400px]'>*/}
          <ul className='bg-white'>
            {menuData.map((item, index) => (
              <li key={index}>
                <DropdownMenuItem
                  asChild
                  className={cn(
                    'hover:border-b-1 m-0 flex w-full cursor-pointer select-none rounded-md border bg-gradient-to-b px-0 py-0.5 text-center text-sm font-medium leading-none text-black no-underline shadow-md hover:bg-accent_green hover:text-black hover:shadow-accent_green',
                    isSelectedPath
                      ? 'border-b-2 border-accent_green px-2 text-accent_green'
                      : ''
                  )}
                  // className='hover:bg-shadow-accent_green flex w-full cursor-pointer select-none flex-col justify-end rounded-md border border-none bg-gray-700 p-0.5 px-0 text-white no-underline shadow-md shadow-none hover:border-b-2 hover:bg-primary hover:text-accent_green'
                >
                  <Link
                    href={item.path}
                    className={'flex items-start justify-center'}
                  >
                    {item.icon && <item.icon className='h-6 w-6' />}
                    <span className='text-md my-1 text-center font-semibold uppercase'>
                      {item.name}
                    </span>
                  </Link>
                  {/*<DropdownMenuLabel>{item.name}</DropdownMenuLabel>*/}
                  {/*<DropdownMenuSeparator />*/}
                </DropdownMenuItem>
              </li>
            ))}
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
