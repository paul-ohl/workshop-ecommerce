import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TechConfiguration from "../TechConfiguration";
import { RefType } from "../types/ref";
import { ConfigElement } from "../types/config-element";

describe("TechConfiguration Component", () => {
  const mockSetExtraConfigs = jest.fn();

  const extraConfigs: RefType[] = [{ label: "Extra Config 1", value: 50 }];

  const techConfigs: ConfigElement[] = [
    {
      _id: "1",
      title: "Tech Config 1",
      description: "Description 1",
      refs: [
        { label: "Ref 1", value: 10 },
        { label: "Ref 2", value: 20 },
      ],
      isMultiSelection: false,
    },
  ];

  it("renders correctly", () => {
    render(
      <TechConfiguration
        extraConfigs={extraConfigs}
        setExtraConfigs={mockSetExtraConfigs}
        techConfigs={techConfigs}
      />
    );

    expect(screen.getByText("CONFIGURATIONS")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Modifiez les configurations initials\s*de votre appareil\./
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Tech Config 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Ref 1")).toBeInTheDocument();
    expect(screen.getByText("Ref 2")).toBeInTheDocument();
  });

  it("handles tech config selection", () => {
    render(
      <TechConfiguration
        extraConfigs={extraConfigs}
        setExtraConfigs={mockSetExtraConfigs}
        techConfigs={techConfigs}
      />
    );

    const ref1Element = screen.getByText("Ref 1");
    fireEvent.click(ref1Element);

    expect(mockSetExtraConfigs).toHaveBeenCalledWith([
      ...extraConfigs,
      techConfigs[0].refs[0],
    ]);
  });

  it("handles tech config deselection", () => {
    render(
      <TechConfiguration
        extraConfigs={[...extraConfigs, techConfigs[0].refs[0]]}
        setExtraConfigs={mockSetExtraConfigs}
        techConfigs={techConfigs}
      />
    );

    const ref1Element = screen.getByText("Ref 1");
    fireEvent.click(ref1Element);

    expect(mockSetExtraConfigs).toHaveBeenCalledWith(extraConfigs);
  });
});
