'use client';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

const PropertyPage = () => {
  const router = useRouter();
  const {id} = useParams();
  const searchParams = useSearchParams();
  const name = searchParams.get('name')
  const pathName = usePathname();
  return (
    <div>
      <button className="p-3 bg-blue-500" onClick={() => router.push('/')}>
        Go Home {id} {name} {pathName}
      </button>
    </div>
  );
};

export default PropertyPage;
