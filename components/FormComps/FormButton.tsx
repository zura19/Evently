import { GlowEffectButton } from "../GlowBtn";
import Loader from "../Loader";
import { Button } from "../ui/button";

export default function FormButton({
  classname,
  content,
  isSubmitting,
  glow = false,
  buttonClassName,
}: {
  classname?: string;
  buttonClassName?: string;
  content: string;
  isSubmitting?: boolean;
  glow?: boolean;
}) {
  if (glow) {
    return (
      <GlowEffectButton className={classname} show={isSubmitting}>
        <Button
          disabled={isSubmitting}
          className={`rounded-full relative w-full ${buttonClassName}`}
        >
          {isSubmitting ? (
            <Loader size="sm" className="loader-white" />
          ) : (
            content
          )}
        </Button>
      </GlowEffectButton>
    );
  }

  return (
    <Button
      disabled={isSubmitting}
      className={`rounded-full w-full ${classname}`}
    >
      {isSubmitting ? <Loader size="sm" className="loader-white" /> : content}
    </Button>
  );
}
