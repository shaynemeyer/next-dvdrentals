import Image from 'next/image';

export default function CompanyLogo() {
  return (
    <div className="flex flex-row items-center leading-none">
      <Image
        src="/images/logo.svg"
        alt="DVD Rentals Inc."
        width={64}
        height={64}
      />
      <p className="text-[44px]">Rentals</p>
    </div>
  );
}
