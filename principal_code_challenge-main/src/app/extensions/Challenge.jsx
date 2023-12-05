import React, { useState } from 'react';
import {
  Divider,
  Button,
  Text,
  Image,
  hubspot,
} from '@hubspot/ui-extensions';

// Add the Extension to the UI
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

// Define the Extension component
const Extension = ({ context, runServerless, sendAlert }) => {
  const [data, setData] = useState({
    "ibm.com": ["basic onboarding", "site migration"],
    "hp.com": ["ent onboarding", "portal merge, website design consultation"],
    "microsoft.com": []});
  const [text, setText] = useState(["data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTU3MC45MDkwOTA5MDkwOTAzIiBoZWlnaHQ9Ijg4LjM2MzYzNjM2MzYzNjM3Ij48cGF0aCBmaWxsPSJyZWQiIHN0cm9rZT0iYmxhY2siIGQ9Ik0zMi40MCA3Ni4zOUwzMi40MCA4MS40OVEyMy44OSA4MS40OSAxOS45MCA3OC4zNVExNS45MSA3NS4yMSAxNS45MSA2Ny44OEwxNS45MSA2Ny44OFExNS45MSA2NS43OCAxNi41NiA2MS44NUwxNi41NiA2MS44NVExNy4wOCA1OC4zMiAxNy4wOCA1Ny4wMUwxNy4wOCA1Ny4wMVExNy4wOCA1NS40NCAxNC41NiA1Mi42OVExMi4wNCA0OS45NCA2Ljg3IDQ1LjgyTDYuODcgNDUuODJRMTcuMDggMzcuNjQgMTcuMDggMzQuMzZMMTcuMDggMzQuMzZRMTcuMDggMzMuMTIgMTYuNTYgMjkuOThMMTYuNTYgMjkuOThRMTUuOTEgMjYuMzEgMTUuOTEgMjMuODNMMTUuOTEgMjMuODNRMTUuOTEgMTYuNDkgMTkuOTAgMTMuMzJRMjMuODkgMTAuMTUgMzIuNDAgMTAuMTVMMzIuNDAgMTAuMTVMMzIuNDAgMTUuMjVRMjYuNTcgMTUuMjUgMjMuOTYgMTcuMjFRMjEuMzQgMTkuMTggMjEuMzQgMjQuMDlMMjEuMzQgMjQuMDlRMjEuMzQgMjYuNzEgMjIuMDYgMjkuNTlMMjIuMDYgMjkuNTlRMjIuNTggMzIuMzMgMjIuNTggMzMuNzFMMjIuNTggMzMuNzFRMjIuNTggMzcuMDUgMjAuNjIgMzkuOTZRMTguNjUgNDIuODcgMTQuNzMgNDUuODJMMTQuNzMgNDUuODJRMTguNzkgNDguNzYgMjAuNjggNTEuNTVRMjIuNTggNTQuMzMgMjIuNTggNTcuNjdMMjIuNTggNTcuNjdRMjIuNTggNTguOTcgMjIuMDYgNjEuNzJMMjIuMDYgNjEuNzJRMjEuNDAgNjUuMTMgMjEuNDAgNjcuNjhMMjEuNDAgNjcuNjhRMjEuNDAgNzIuNTIgMjMuOTkgNzQuNDVRMjYuNTcgNzYuMzkgMzIuNDAgNzYuMzlMMzIuNDAgNzYuMzlaIi8+PC9zdmc+", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTU3MC45MDkwOTA5MDkwOTAzIiBoZWlnaHQ9Ijg4LjM2MzYzNjM2MzYzNjM3Ij48cGF0aCBmaWxsPSJyZWQiIHN0cm9rZT0iYmxhY2siIGQ9Ik02Ljg3IDgxLjQ5TDYuODcgNzYuMzlRMTIuNzAgNzYuMzkgMTUuMjggNzQuNDVRMTcuODcgNzIuNTIgMTcuODcgNjcuNjhMMTcuODcgNjcuNjhRMTcuODcgNjUuMTMgMTcuMjEgNjEuNzJMMTcuMjEgNjEuNzJRMTYuNjkgNTguOTcgMTYuNjkgNTcuNjdMMTYuNjkgNTcuNjdRMTYuNjkgNTQuMzMgMTguNTkgNTEuNTVRMjAuNDkgNDguNzYgMjQuNTUgNDUuODJMMjQuNTUgNDUuODJRMjAuNjIgNDIuODcgMTguNjUgMzkuOTZRMTYuNjkgMzcuMDUgMTYuNjkgMzMuNzFMMTYuNjkgMzMuNzFRMTYuNjkgMzIuMzMgMTcuMjEgMjkuNTlMMTcuMjEgMjkuNTlRMTcuOTMgMjYuNzEgMTcuOTMgMjQuMDlMMTcuOTMgMjQuMDlRMTcuOTMgMTkuMTggMTUuMzIgMTcuMjFRMTIuNzAgMTUuMjUgNi44NyAxNS4yNUw2Ljg3IDE1LjI1TDYuODcgMTAuMTVRMTUuMzggMTAuMTUgMTkuMzcgMTMuMzJRMjMuMzcgMTYuNDkgMjMuMzcgMjMuODNMMjMuMzcgMjMuODNRMjMuMzcgMjYuMzEgMjIuNzEgMjkuOThMMjIuNzEgMjkuOThRMjIuMTkgMzMuMTIgMjIuMTkgMzQuMzZMMjIuMTkgMzQuMzZRMjIuMTkgMzcuNjQgMzIuNDAgNDUuODJMMzIuNDAgNDUuODJRMjcuMjMgNDkuOTQgMjQuNzEgNTIuNjlRMjIuMTkgNTUuNDQgMjIuMTkgNTcuMDFMMjIuMTkgNTcuMDFRMjIuMTkgNTguMzIgMjIuNzEgNjEuODVMMjIuNzEgNjEuODVRMjMuMzcgNjUuNzggMjMuMzcgNjcuODhMMjMuMzcgNjcuODhRMjMuMzcgNzUuMjEgMTkuMzcgNzguMzVRMTUuMzggODEuNDkgNi44NyA4MS40OUw2Ljg3IDgxLjQ5WiIvPjwvc3ZnPg=="]);

  const load = () => {
    runServerless({ name: 'fetchData', propertiesToSend: ['email'] }).then((resp) => {
        sendAlert({ message: resp.status })
        setData(resp.response)
        console.log(resp.response)
      }
    );
  };

  const render = () => {
    runServerless({ name: 'renderText', parameters: { text: data } }).then((resp) => {
        setText(resp.response)
        console.log("the second serverless function has run")
        console.log(resp.response)
      }
    );
  };

  return (
    <>
      <Text>
        <Text format={{ fontWeight: 'bold' }}>
          version 1.1.03
        </Text>
        Hi, {context.user.firstName}!

        The first button fetches external CSV data on contact-to-domain associations, then matches all domains that belong to this contact to companies in the CRM, and then to associated deals' line items.

        The second button outputs the JSON containing the domain-line item mappings.

        In the fictional business context, this output represents all SKUs that *we* are already selling to accounts that *this contact* (a freelance solution partner) has reserved for themselves.
      </Text>
      <Divider />
        <Button type="button" onClick={load}>
          Update Source Data
        </Button>
        <Button type="button" onClick={render}>
          Show SKUs
        </Button>
      <Divider />
      {text.slice(0,5).map((src, index) => (
        <Image 
          key={index}
          src={src}
          alt={src}
          width={1500}
          height={75}
        />
      ))}
    </>
  );
};
