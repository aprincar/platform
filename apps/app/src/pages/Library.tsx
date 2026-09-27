import { Badge, Button } from '@mantine/core';
import { CloudOff, Gamepad2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useAppStore } from '../app-store';
import { GameCard } from '../components/GameCard';
import { EmptyState } from '@aprincar/ui';

export function Library() {
  const { registry, libraryIds, isOfflineReady } = useAppStore();
  const [offlineStatus, setOfflineStatus] = useState<Record<string, boolean>>({});
  const list = registry.filter((entry) => libraryIds.has(entry.id));

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const next: Record<string, boolean> = {};
      for (const item of list) next[item.id] = await isOfflineReady(item);
      if (mounted) setOfflineStatus(next);
    })();
    return () => { mounted = false; };
  }, [list.length, registry]);

  const offlineReadyCount = list.filter((entry) => offlineStatus[entry.id]).length;

  return (
    <div className="aprincar-page approved-library-page">
      <section className="approved-catalog-header approved-library-header">
        <div>
          <span className="approved-kicker">Sua coleção</span>
          <h1>Biblioteca</h1>
          <p>Jogos favoritos e atividades preparadas para voltar a brincar rapidamente.</p>
        </div>
        <Badge size="lg" color="teal" variant="light" leftSection={<CloudOff size={14} />}>
          {offlineReadyCount} de {list.length} offline
        </Badge>
      </section>

      {list.length === 0 ? (
        <EmptyState
          title="Sua biblioteca está pronta para crescer"
          description="Escolha jogos no catálogo para guardar aqui."
          action={<Button component={Link} to="/discover" className="approved-primary-cta" leftSection={<Gamepad2 size={17}/>}>Explorar jogos</Button>}
        />
      ) : (
        <section className="approved-game-list">
          {list.map((entry) => <GameCard key={entry.id} entry={entry} compact />)}
        </section>
      )}
    </div>
  );
}
