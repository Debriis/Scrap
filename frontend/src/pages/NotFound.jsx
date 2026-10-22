import { PageIntro, Button } from "../components/ui/Shared";
export default function NotFound() {
  return (
    <div className="not-found">
      <PageIntro
        eyebrow="404 / A DIFFERENT KIND OF SCRAP"
        title="This page took a detour"
      >
        Let’s get you back to something useful.
      </PageIntro>
      <div className="container">
        <Button to="/">Return to Home</Button>
      </div>
    </div>
  );
}
