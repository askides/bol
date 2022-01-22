import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Accordion } from "./Accordion";

it("should render without crashing", () => {
  render(
    <Accordion>
      <Accordion.Item>
        <Accordion.Button>Accordion Button</Accordion.Button>
        <Accordion.Panel>Accordion Panel</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  expect(screen.getByRole("list")).toBeInTheDocument();
});

it("should have by default all the accordion items collapsed", () => {
  render(
    <Accordion>
      <Accordion.Item>
        <Accordion.Button>Accordion Button</Accordion.Button>
        <Accordion.Panel>Accordion Panel</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("region")).not.toBeInTheDocument();
});

it("should have the first accordion item expanded", () => {
  render(
    <Accordion defaults={[0]}>
      <Accordion.Item>
        <Accordion.Button>Accordion Button</Accordion.Button>
        <Accordion.Panel>Accordion Panel</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("region")).toBeInTheDocument();
});

it("should have the correct aria-controls", () => {
  render(
    <Accordion defaults={[0]}>
      <Accordion.Item>
        <Accordion.Button>Accordion Button</Accordion.Button>
        <Accordion.Panel>Accordion Panel</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  expect(screen.getByRole("button")).toHaveAttribute(
    "aria-controls",
    "0-section"
  );
  expect(screen.getByRole("region")).toHaveAttribute("id", "0-section");
});

it("should have the correct aria-labelledby", () => {
  render(
    <Accordion defaults={[0]}>
      <Accordion.Item>
        <Accordion.Button>Accordion Button</Accordion.Button>
        <Accordion.Panel>Accordion Panel</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  expect(screen.getByRole("button")).toHaveAttribute("id", "0-id");
  expect(screen.getByRole("region")).toHaveAttribute("aria-labelledby", "0-id");
});

it("should open and close the accordion item when the button is clicked", () => {
  render(
    <Accordion>
      <Accordion.Item>
        <Accordion.Button>Accordion Button</Accordion.Button>
        <Accordion.Panel>Accordion Panel</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("region")).not.toBeInTheDocument();

  userEvent.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("region")).toBeInTheDocument();
  expect(screen.getByRole("region")).toHaveTextContent("Accordion Panel");

  userEvent.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("region")).not.toBeInTheDocument();
});

it("should close all the other accordion items when one is clicked", () => {
  render(
    <Accordion>
      <Accordion.Item>
        <Accordion.Button>Accordion Button</Accordion.Button>
        <Accordion.Panel>Accordion Panel</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Button>Accordion Button 2</Accordion.Button>
        <Accordion.Panel>Accordion Panel 2</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  const firstButton = screen.getByRole("button", { name: "Accordion Button" });
  const secondButton = screen.getByRole("button", {
    name: "Accordion Button 2",
  });

  expect(firstButton).toHaveAttribute("aria-expanded", "false");
  expect(secondButton).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByText("Accordion Panel")).not.toBeInTheDocument();
  expect(screen.queryByText("Accordion Panel 2")).not.toBeInTheDocument();

  userEvent.click(firstButton);

  expect(firstButton).toHaveAttribute("aria-expanded", "true");
  expect(secondButton).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByText("Accordion Panel")).toBeInTheDocument();
  expect(screen.queryByText("Accordion Panel 2")).not.toBeInTheDocument();

  userEvent.click(secondButton);

  expect(firstButton).toHaveAttribute("aria-expanded", "false");
  expect(secondButton).toHaveAttribute("aria-expanded", "true");
  expect(screen.queryByText("Accordion Panel")).not.toBeInTheDocument();
  expect(screen.getByText("Accordion Panel 2")).toBeInTheDocument();
});

it("should keep the accordion item expanded when another is clicked", () => {
  render(
    <Accordion multiple>
      <Accordion.Item>
        <Accordion.Button>Accordion Button</Accordion.Button>
        <Accordion.Panel>Accordion Panel</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Button>Accordion Button 2</Accordion.Button>
        <Accordion.Panel>Accordion Panel 2</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  const firstButton = screen.getByRole("button", { name: "Accordion Button" });
  const secondButton = screen.getByRole("button", {
    name: "Accordion Button 2",
  });

  expect(firstButton).toHaveAttribute("aria-expanded", "false");
  expect(secondButton).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByText("Accordion Panel")).not.toBeInTheDocument();
  expect(screen.queryByText("Accordion Panel 2")).not.toBeInTheDocument();

  userEvent.click(firstButton);

  expect(firstButton).toHaveAttribute("aria-expanded", "true");
  expect(secondButton).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByText("Accordion Panel")).toBeInTheDocument();
  expect(screen.queryByText("Accordion Panel 2")).not.toBeInTheDocument();

  userEvent.click(secondButton);

  expect(firstButton).toHaveAttribute("aria-expanded", "true");
  expect(secondButton).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText("Accordion Panel")).toBeInTheDocument();
  expect(screen.getByText("Accordion Panel 2")).toBeInTheDocument();
});
