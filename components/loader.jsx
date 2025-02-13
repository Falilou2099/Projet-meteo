useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 secondes de délai pour simuler le chargement
  }, []);
  
  if (loading) {
    return (
      <div className="loader">
      <img src="./image/F.png" alt="loader" />
      </div>
    );
  }
