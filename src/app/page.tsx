'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import SetupStatus from '@/components/SetupStatus';
import { useProductStore } from '@/lib/store/products';

export default function Home() {
  const { products, loading, error, setProducts, setLoading, setError } = useProductStore();
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    async function checkSetupAndFetchProducts() {
      setLoading(true);
      setError(null);

      try {
        // First check if setup is complete
        const setupResponse = await fetch('/api/setup-check');
        if (setupResponse.ok) {
          const setupData = await setupResponse.json();
          
          // If database is not ready, show setup page
          if (!setupData.canConnect || !setupData.hasSchema || !setupData.hasData) {
            setShowSetup(true);
            setLoading(false);
            return;
          }
        }

        // If setup check fails or setup is complete, try to fetch products
        const response = await fetch('/api/products');
        if (!response.ok) {
          // If products fetch fails, show setup page
          setShowSetup(true);
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        setProducts(data);
        setShowSetup(false);
      } catch (err) {
        // On any error, show setup page
        setShowSetup(true);
      } finally {
        setLoading(false);
      }
    }

    checkSetupAndFetchProducts();
  }, [setProducts, setLoading, setError]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Show setup page if database is not ready
  if (showSetup) {
    return <SetupStatus />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Nike Store</h1>
          <p className="text-gray-600 mt-2">Discover the latest Nike products</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found. Make sure to seed the database!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
