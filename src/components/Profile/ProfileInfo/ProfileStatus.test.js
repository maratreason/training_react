import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile status component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("it-kamasutra.com");
    });

    test("auto creation <SPAN> with status should be displayed", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("auto creation <SPAN> with status should contains the correct status", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("it-kamasutra.com");
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("it-kamasutra.com");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateStatus();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});