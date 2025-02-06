import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddToCart from "../AddToCart";
import { RefType } from "../types/ref";
import { ConfigElement } from "../types/config-element";

describe("AddToCart Component", () => {
  const mockSetTotalPrice = jest.fn();
  const mockSetExtraConfigs = jest.fn();

  const extraConfigs: RefType[] = [
    { label: "Extra Config 1", value: 0 },
    { label: "Extra Config 2", value: 0 },
  ];

  const techConfigs: ConfigElement[] = [
    {
      _id: "1",
      title: "Tech Config 1",
      refs: [],
      isMultiSelection: false,
    },
  ];

  it("renders correctly", () => {
    render(
      <AddToCart
        totalPrice={0}
        setTotalPrice={mockSetTotalPrice}
        extraConfigs={extraConfigs}
        setExtraConfigs={mockSetExtraConfigs}
        techConfigs={techConfigs}
      />
    );

    expect(screen.getByText("149.00 €")).toBeInTheDocument();
    expect(screen.getByText("Prix Total")).toBeInTheDocument();
    expect(screen.getByText("Accompte (30%) : 0.00 €")).toBeInTheDocument();
    expect(
      screen.getByText("Livraison dans 35 - 40 jours")
    ).toBeInTheDocument();
    expect(screen.getByText("ÉLEMENT(S) AJOUTÉ(S)")).toBeInTheDocument();
    expect(screen.getByText("+ Extra Config 1")).toBeInTheDocument();
    expect(screen.getByText("+ Extra Config 2")).toBeInTheDocument();
  });

  it("removes extra config on click", () => {
    render(
      <AddToCart
        totalPrice={0}
        setTotalPrice={mockSetTotalPrice}
        extraConfigs={extraConfigs}
        setExtraConfigs={mockSetExtraConfigs}
        techConfigs={techConfigs}
      />
    );

    const extraConfigElement = screen.getByText("+ Extra Config 1");
    fireEvent.click(extraConfigElement);

    expect(mockSetExtraConfigs).toHaveBeenCalledWith(
      extraConfigs.filter((item) => item !== extraConfigs[0])
    );
  });
});
