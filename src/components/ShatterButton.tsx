import { type CSSProperties, type MouseEvent, type ReactNode, useCallback, useMemo, useState } from 'react';
import '../styles/shatter-button.css';

interface Shard {
  id: number;
  velocityX: number;
  velocityY: number;
  rotation: number;
  size: number;
  duration: number;
  points: string;
}

interface BaseProps {
  children: ReactNode;
  className?: string;
  shardCount?: number;
  shatterColor?: string;
  preserveLayout?: boolean;
}

type ButtonModeProps = BaseProps & {
  href?: undefined;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaCurrent?: 'page' | undefined;
};

type LinkModeProps = BaseProps & {
  href: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
  download?: boolean;
  ariaCurrent?: 'page' | undefined;
};

type ShatterButtonProps = ButtonModeProps | LinkModeProps;

const makePolygon = () => {
  const p1 = `${Math.round(Math.random() * 50)}% 0%`;
  const p2 = `100% ${Math.round(Math.random() * 50)}%`;
  const p3 = `${50 + Math.round(Math.random() * 50)}% 100%`;
  const p4 = `0% ${50 + Math.round(Math.random() * 50)}%`;
  return `${p1}, ${p2}, ${p3}, ${p4}`;
};

export const ShatterButton = ({
  children,
  className = '',
  shardCount = 20,
  shatterColor = 'var(--primary)',
  preserveLayout = false,
  ...rest
}: ShatterButtonProps) => {
  const [burstId, setBurstId] = useState(0);
  const [isBursting, setIsBursting] = useState(false);

  const shards = useMemo<Shard[]>(() => {
    if (burstId === 0) return [];

    return Array.from({ length: shardCount }, (_, i) => {
      const angle = (Math.PI * 2 * i) / shardCount + Math.random() * 0.55;
      const velocity = 42 + Math.random() * 92;
      return {
        id: i,
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity,
        rotation: Math.random() * 720 - 360,
        size: 4 + Math.random() * 10,
        duration: 620 + Math.random() * 220,
        points: makePolygon(),
      };
    });
  }, [burstId, shardCount]);

  const triggerBurst = useCallback(() => {
    if (isBursting) return;
    setBurstId((value) => value + 1);
    setIsBursting(true);
    window.setTimeout(() => setIsBursting(false), 720);
  }, [isBursting]);

  const colorStyle = { '--shatter-color': shatterColor } as CSSProperties;
  const sharedClassName = `shatter-btn ${className}`.trim();

  return (
    <span className={`shatter-wrap${isBursting ? ' is-bursting' : ''}`} style={colorStyle}>
      {'href' in rest ? (
        <a
          href={rest.href}
          target={rest.target}
          rel={rest.rel}
          download={rest.download}
          aria-current={rest.ariaCurrent}
          className={sharedClassName}
          onPointerDown={triggerBurst}
          onClick={(event) => {
            if (!isBursting) triggerBurst();
            rest.onClick?.(event);
          }}
        >
          <span className="shatter-glow" aria-hidden="true" />
          {preserveLayout ? children : <span className="shatter-label">{children}</span>}
        </a>
      ) : (
        <button
          type={rest.type ?? 'button'}
          disabled={rest.disabled}
          aria-current={rest.ariaCurrent}
          className={sharedClassName}
          onPointerDown={triggerBurst}
          onClick={(event) => {
            if (!isBursting) triggerBurst();
            rest.onClick?.(event);
          }}
        >
          <span className="shatter-glow" aria-hidden="true" />
          {preserveLayout ? children : <span className="shatter-label">{children}</span>}
        </button>
      )}

      {isBursting && (
        <>
          <span className="shatter-ring" aria-hidden="true" />
          <span className="shatter-shards" aria-hidden="true">
            {shards.map((shard) => (
              <span
                key={`${burstId}-${shard.id}`}
                className="shard"
                style={
                  {
                    '--tx': `${shard.velocityX}px`,
                    '--ty': `${shard.velocityY}px`,
                    '--rot': `${shard.rotation}deg`,
                    '--size': `${shard.size}px`,
                    '--dur': `${shard.duration}ms`,
                    '--poly': `polygon(${shard.points})`,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        </>
      )}
    </span>
  );
};
