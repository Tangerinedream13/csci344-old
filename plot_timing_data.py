import pandas as pd
import matplotlib.pyplot as plt

# Load data from the CSV file
data = pd.DataFrame({
    'Operation': ['Addition']*5,
    'Size': [100]*5,
    'Implementation': ['ArrayLargeInteger']*5,
    'Time (ns)': [167, 167, 41, 42, 42],
    'Average Time (ns)': [33, 66, 75, 83, 91]
})

# Plot 1: Execution Time per Operation
plt.figure(figsize=(10, 5))
plt.plot(data.index + 1, data['Time (ns)'], marker='o', linestyle='-', color='blue', label='Execution Time (ns)')
plt.xlabel("Execution Number")
plt.ylabel("Time (ns)")
plt.title("Execution Time per Operation for ArrayLargeInteger Addition")
plt.legend()
plt.grid(True)
plt.show()

# Plot 2: Cumulative Average Time
plt.figure(figsize=(10, 5))
plt.plot(data.index + 1, data['Average Time (ns)'], marker='o', linestyle='-', color='green', label='Cumulative Average Time (ns)')
plt.xlabel("Execution Number")
plt.ylabel("Cumulative Average Time (ns)")
plt.title("Cumulative Average Time for ArrayLargeInteger Addition")
plt.legend()
plt.grid(True)
plt.show()